import { Module } from '@nestjs/common';
import { EmployeeSignatureController } from './employee-signature.controller';
import { EmployeeSignatureService } from './employee-signature.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
      MulterModule.register({
        dest: './uploads/emp_signatures',
      }),
    ],
  controllers: [EmployeeSignatureController],
  providers: [EmployeeSignatureService]
})
export class EmployeeSignatureModule {}
