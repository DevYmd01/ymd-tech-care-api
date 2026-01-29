import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
}
