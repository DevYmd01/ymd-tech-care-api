import { IsBoolean, IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class SendToVendorDTO {

    @IsNotEmpty()
    @IsNumber()
    rfq_vendor_id: number;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsBoolean()
    send_email: boolean;

}
