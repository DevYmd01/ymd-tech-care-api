import { Controller } from '@nestjs/common';
import { AppvTransferStockService } from './appv-transfer-stock.service';
import { CreateAppvTransferHeaderDto } from './dto/create-appv-transfer-header.dto';
import { UpdateAppvTransferHeaderDto } from './dto/update-appv-transfer-header.dto';

@Controller('appv-transfer-stock')
export class AppvTransferStockController {}
