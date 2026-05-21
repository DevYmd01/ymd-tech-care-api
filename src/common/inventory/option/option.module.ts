import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OptionController } from './option.controller';
import { IcOptionValidationService } from './application/ic-option-validation.service'; 

@Module({
    providers: [PrismaService, IcOptionValidationService],
  exports: [PrismaService],
  controllers: [OptionController],
})
export class OptionModule {}
