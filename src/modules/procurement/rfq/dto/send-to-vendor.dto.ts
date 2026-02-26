import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class SendToVendorDTO {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    send_email: boolean;

}
