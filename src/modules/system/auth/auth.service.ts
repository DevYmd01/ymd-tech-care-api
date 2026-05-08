import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, BadRequestException, NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ChangeUsernameDto, ChangePasswordDto } from './dto/change-auth.dto';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async createAuth(employee_id: number, dto: CreateAuthDto) {
        const exists = await this.prisma.employee_auth.findUnique({
            where: { username: dto.username },
        });

        if (exists) {
            throw new ConflictException('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        try {
            return await this.prisma.employee_auth.create({
                data: {
                    username: dto.username,
                    password: hashedPassword,
                    employee: {
                        connect: { employee_id },
                    },
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('Username already exists');
            }
            throw error;
        }
    }

    async changePassword(
        employee_id: number,
        newPassword: string,
    ) {

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        return this.prisma.employee_auth.update({

            where: {
                employee_id,
            },

            data: {
                password: hashedPassword,
            },
        });
    }

    async changeUsername(
        employee_id: number,
        dto: ChangeUsernameDto,
    ) {

        const auth =
            await this.prisma.employee_auth.findUnique({
                where: { employee_id },
            });

        if (!auth) {
            throw new NotFoundException(
                'Account not found',
            );
        }

        // ตรวจ username เดิม
        if (auth.username !== dto.new_username) {
            throw new BadRequestException(
                'Current username incorrect',
            );
        }

        // ตรวจ username ซ้ำ
        const exists =
            await this.prisma.employee_auth.findUnique({
                where: {
                    username: dto.new_username,
                },
            });

        if (exists) {
            throw new ConflictException(
                'Username already exists',
            );
        }

        return this.prisma.employee_auth.update({

            where: {
                employee_id,
            },

            data: {
                username: dto.new_username,
            },
        });
    }


   async login(username: string, password: string) {

    const user =
        await this.prisma.employee_auth.findUnique({
            where: { username },

            include: {
                employee: true,
            },
        });

    if (!user) {
        throw new UnauthorizedException(
            'Invalid username or password',
        );
    }

    // -------------------------
    // CHECK LOCK
    // -------------------------

    const now = new Date();

    if (
        user.locked_until &&
        user.locked_until > now
    ) {

        const seconds =
            Math.ceil(
                (
                    user.locked_until.getTime() -
                    now.getTime()
                ) / 1000,
            );

        throw new UnauthorizedException(
            `Too many attempts. Try again in ${seconds} seconds.`,
        );
    }

    // -------------------------
    // CHECK PASSWORD
    // -------------------------

    const isMatch =
        await bcrypt.compare(
            password,
            user.password,
        );

    if (!isMatch) {

        let failedCount =
            user.failed_login_count + 1;

        let lockedUntil: Date | null = null;

        // เริ่ม lock หลังผิด 3 ครั้ง
        if (failedCount >= 4) {

            const waitSeconds =
                15 + ((failedCount - 4) * 5);

            lockedUntil =
                new Date(
                    now.getTime() +
                    waitSeconds * 1000,
                );
        }

        await this.prisma.employee_auth.update({

            where: {
                employee_id:
                    user.employee_id,
            },

            data: {
                failed_login_count:
                    failedCount,

                locked_until:
                    lockedUntil,
            },
        });

        throw new UnauthorizedException(
            'Invalid username or password',
        );
    }

    // -------------------------
    // RESET FAIL COUNT
    // -------------------------

    await this.prisma.employee_auth.update({

        where: {
            employee_id: user.employee_id,
        },

        data: {
            failed_login_count: 0,
            locked_until: null,
        },
    });

    // -------------------------
    // JWT
    // -------------------------

    const payload = {
        sub: user.employee_id,
        employee_id: user.employee_id,
    };

    return {

        access_token:
            this.jwtService.sign(payload),

        user: {
            id: user.employee_id,
            username: user.username,
            employee_id: user.employee_id,
            employee: user.employee,
        },
    };
}
}
