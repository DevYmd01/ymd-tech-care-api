
import { IsString, IsNotEmpty } from 'class-validator';
export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    newPassword!: string;
}

export class ChangeUsernameDto {
    @IsString()
    @IsNotEmpty()
    new_username!: string;
}