import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgBranchModule } from './org_branch/org_branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorsModule } from './vendors/vendors.module';


@Module({
  imports: [OrgBranchModule, PrismaModule, VendorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }






