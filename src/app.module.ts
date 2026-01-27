import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgBranchModule } from './master-data/org_branch/org_branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorsModule } from './modules/master-data/vendors/vendors.module';
import { PrModule } from './modules/procurement/pr/pr.module';
import { VendorTypeModule } from './modules/master-data/vendor-type/vendor-type.module';
import { VendorGroupModule } from './modules/master-data/vendor-group/vendor-group.module';
import { CurrencyModule } from './modules/master-data/currency/currency.module';



@Module({
  imports: [OrgBranchModule, PrismaModule, VendorsModule, PrModule, VendorTypeModule, VendorGroupModule, CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }






