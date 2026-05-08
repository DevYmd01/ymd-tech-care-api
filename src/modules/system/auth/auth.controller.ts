import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangeUsernameDto, ChangePasswordDto } from './dto/change-auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('employees/:employee_id/auth')
    async createAuth(
        @Param('employee_id') employee_id: number,
        @Body() body: CreateAuthDto,
    ) {
        return this.authService.createAuth(employee_id, body);
    }

    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.authService.login(body.username, body.password);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('employees/:employee_id/change-password')
    async changePassword(
        @Param('employee_id') employee_id: number,
        @Body() { newPassword }: ChangePasswordDto,
    ) {
        return this.authService.changePassword(employee_id, newPassword);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put('employees/:employee_id/change-username')
    async changeUsername(
        @Param('employee_id') employee_id: number,
        @Body() { new_username }: ChangeUsernameDto,
    ) {
        return this.authService.changeUsername(employee_id, { new_username });
    }

}
