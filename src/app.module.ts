import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrgBranchModule } from './modules/master-data/organization/org_branch/org_branch.module';
import { PrismaModule } from './prisma/prisma.module';
import { VendorsModule } from './modules/master-data/vendors/vendors.module';
import { PrModule } from './modules/procurement/pr/pr.module';
import { VendorTypeModule } from './modules/master-data/vendor-type/vendor-type.module';
import { VendorGroupModule } from './modules/master-data/vendor-group/vendor-group.module';
import { CurrencyModule } from './modules/master-data/currency/currency.module';
import { DepartmentModule } from './modules/master-data/department/department.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/system/auth/auth.module';
import { OrgPositionModule } from './modules/master-data/organization/org-position/org-position.module';
import { WarehouseModule } from './modules/master-data/warehouse/warehouse/warehouse.module';
import { ItemCategoryModule } from './modules/master-data/item/item-category/item-category.module';
import { ItemTypeModule } from './modules/master-data/item/item-type/item-type.module';
import { ItemSizeModule } from './modules/master-data/item/item-size/item-size.module';
import { ItemBrandModule } from './modules/master-data/item/item-brand/item-brand.module';
import { ItemPatternModule } from './modules/master-data/item/item-pattern/item-pattern.module';
import { ItemDesignModule } from './modules/master-data/item/item-design/item-design.module';
import { ItemClassModule } from './modules/master-data/item/item-class/item-class.module';
import { ItemGroupModule } from './modules/master-data/item/item-group/item-group.module';
import { ItemMasterModule } from './modules/master-data/item/item-master/item-master.module';
import { UomModule } from './modules/master-data/uom/uom.module';
import { DocumentNumberModule } from './modules/document-number/document-number.module';
import { DocumentFormatModule } from './modules/document-format/document-format.module';
import { RequestContextMiddleware } from './common/middleware/request-context.middleware';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TaxGroupModule } from './modules/master-data/tax/tax-group/tax-group.module';
import { TaxCodeModule } from './modules/master-data/tax/tax-code/tax-code.module';
import { ProjectModule } from './modules/master-data/project/project.module';
import { CostCentersModule } from './modules/master-data/cost-centers/cost-centers.module';
import { RfqModule } from './modules/procurement/rfq/rfq.module';
import { QtModule } from './modules/procurement/qt/qt.module';
import { AuditModule } from './modules/audit/audit.module';
import { PdfService } from './modules/pdf/pdf.service';
import { PdfModule } from './modules/pdf/pdf.module';
import { MailModule } from './modules/mail/mail.module';
import { LocationModule } from './modules/master-data/warehouse/location/location.module';
import { CompanyModule } from './modules/master-data/organization/company/company.module';
import { ConfigModule } from '@nestjs/config';
import { VqModule } from './modules/procurement/vq/vq.module';
import { QcModule } from './modules/procurement/qc/qc.module';
import { PoModule } from './modules/procurement/po/po.module';
import { ItemColorModule } from './modules/master-data/item/item-color/item-color.module';
import { ItemGradeModule } from './modules/master-data/item/item-grade/item-grade.module';
import { ShelfModule } from './modules/master-data/warehouse/shelf/shelf.module';
import { PrApprovalService } from './modules/procurement/pr-approval/pr-approval.service';
import { PrApprovalModule } from './modules/procurement/pr-approval/pr-approval.module';
import { PoApprovalModule } from './modules/procurement/po-approval/po-approval.module';
import { ItemBarcodeModule } from './modules/master-data/item/item-barcode/item-barcode.module';
import { PositionModule } from './modules/master-data/organization/position/position.module';
import { EmployeeGroupModule } from './modules/master-data/employee-group/employee-group.module';
import { EmployeeSaleAreaModule } from './modules/master-data/employee-sale-area/employee-sale-area.module';
import { EmployeeSaleChannelModule } from './modules/master-data/employee-sale-channel/employee-sale-channel.module';
import { EmployeesSalePeriodModule } from './modules/master-data/empployees-sale-period/employees-sale-period.module';
import { EmpployeesSaleTargetModule } from './modules/master-data/empployees-sale-target/empployees-sale-target.module';
import { CustomerTypeModule } from './modules/master-data/customer/customer-type/customer-type.module';
import { CustomerGroupModule } from './modules/master-data/customer/customer-group/customer-group.module';
import { BusinessTypeModule } from './modules/master-data/business/business-type/business-type.module';
import { BillGroupModule } from './modules/master-data/customer/bill-group/bill-group.module';
import { CustomerMasterModule } from './modules/master-data/customer/customer-master/customer-master.module';
import { PriceListModule } from './modules/pricing/price-list/price-list.module';
import { EmployeeSideModule } from './modules/master-data/employee-side/employee-side.module';
import { MultiPriceItemModule } from './modules/pricing/multi-price-item/multi-price-item.module';
import { PriceLevelModule } from './modules/pricing/price-level/price-level.module';
import { InventoryOptionModule } from './modules/master-data/inventory-option/inventory-option.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    ItemMasterModule,
    UomModule,
    DocumentNumberModule,
    DocumentFormatModule,
    TaxGroupModule,
    TaxCodeModule,
    ProjectModule,
    CostCentersModule,
    RfqModule,
    QtModule,
    AuditModule,
    PdfModule,
    MailModule,
    LocationModule,
    CompanyModule,
    VqModule,
    QcModule,
    PoModule,
    ItemColorModule,
    ItemGradeModule,
    ShelfModule,
    PrApprovalModule,
    PoApprovalModule,
    ItemBarcodeModule,
    PositionModule,
    EmployeeGroupModule,
    EmployeeSaleAreaModule,
    EmployeeSaleChannelModule,
    EmployeesSalePeriodModule,
    EmpployeesSaleTargetModule,
    CustomerTypeModule,
    CustomerGroupModule,
    BusinessTypeModule,
    BillGroupModule,
    CustomerMasterModule,
    PriceListModule,
    EmployeeSideModule,
    MultiPriceItemModule,
    PriceLevelModule,
    InventoryOptionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PdfService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestContextMiddleware)
      .forRoutes('*');
  }

}
