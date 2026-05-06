import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaService } from '@/prisma/prisma.service';
import { EmployeesRepository } from './repository/employees.repository';
import { EmployeesMapper } from './mapper/employees.mapper';
import { AddressRepository } from './repository/address.repository';
import { AddressMapper } from './mapper/address.mapper';

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    PrismaService,
    EmployeesRepository,
    EmployeesMapper,
    AddressRepository,
    AddressMapper
  ]
})
export class EmployeesModule { }
