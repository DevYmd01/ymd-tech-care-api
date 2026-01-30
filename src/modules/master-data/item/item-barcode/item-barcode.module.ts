import { Module } from '@nestjs/common';
import { ItemBarcodeController } from './item-barcode.controller';
import { ItemBarcodeService } from './item-barcode.service';

@Module({
  controllers: [ItemBarcodeController],
  providers: [ItemBarcodeService]
})
export class ItemBarcodeModule {}
