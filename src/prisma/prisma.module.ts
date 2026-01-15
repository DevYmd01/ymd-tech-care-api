import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // ⭐ ทำให้ทุก module ใช้ได้โดยไม่ต้อง import ซ้ำ
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
