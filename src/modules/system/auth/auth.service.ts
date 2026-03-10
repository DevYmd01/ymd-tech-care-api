import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import { Prisma } from '@prisma/client';


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


    async login(username: string, password: string) {
        const user = await this.prisma.employee_auth.findUnique({
            where: { username },
            include: {
                employee: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('Username not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = {
            sub: user.employee_id,
            username: user.username,
            employee_id: user.employee_id,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.employee_id,
                username: user.username,
                employee_id: user.employee_id,
                employee: user.employee,
            },
        };
    }
}
