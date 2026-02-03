import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgBranchModule } from './modules/master-data/org_branch/org_branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorsModule } from './modules/master-data/vendors/vendors.module';
import { PrModule } from './modules/procurement/pr/pr.module';
import { VendorTypeModule } from './modules/master-data/vendor-type/vendor-type.module';
import { VendorGroupModule } from './modules/master-data/vendor-group/vendor-group.module';
import { CurrencyModule } from './modules/master-data/currency/currency.module';
import { DepartmentModule } from './modules/master-data/department/department.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { OrgPositionModule } from './modules/master-data/org-position/org-position.module';
import { WarehouseModule } from './modules/master-data/warehouse/warehouse.module';
import { ItemCategoryModule } from './modules/master-data/item-category/item-category.module';
import { ItemTypeModule } from './modules/master-data/item-type/item-type.module';
import { ItemSizeModule } from './modules/master-data/item/item-size/item-size.module';
import { ItemBrandModule } from './modules/master-data/item/item-brand/item-brand.module';
import { ItemPatternModule } from './modules/master-data/item/item-pattern/item-pattern.module';
import { ItemDesignModule } from './modules/master-data/item/item-design/item-design.module';
import { ItemClassModule } from './modules/master-data/item/item-class/item-class.module';
import { ItemGroupModule } from './modules/master-data/item/item-group/item-group.module';
import { ItemMasterModule } from './modules/master-data/item/item-master/item-master.module';


@Module({
  imports: [
    OrgBranchModule,
    PrismaModule,
    VendorsModule,
    PrModule,
    VendorTypeModule,
    VendorGroupModule,
    CurrencyModule,
    DepartmentModule,
    EmployeesModule,
    AuthModule,
    OrgPositionModule,
    WarehouseModule,
    ItemCategoryModule,
    ItemTypeModule,
    ItemSizeModule,
    ItemBrandModule,
    ItemPatternModule,
    ItemDesignModule,
    ItemClassModule,
    ItemGroupModule,
    ItemMasterModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }






