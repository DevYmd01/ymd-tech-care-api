import { Module } from '@nestjs/common';

import { LotBalanceController } from './lot-balance.controller';
import { LotBalanceService } from './lot-balance.service';

import { PrismaService } from '@/prisma/prisma.service';


// ======================================================
// MOVEMENT SERVICES
// ======================================================
import { AdjustLotService } from './domain/service/movements/adjust-lot.service';
import { ReceiveLotService } from './domain/service/movements/receive-lot.service';
import { IssueLotService } from './domain/service/movements/issue-lot.service';
import { ReserveLotService } from './domain/service/movements/reserve-lot.service';
import { ReleaseLotService } from './domain/service/movements/release-lot.service';
import { TransferLotService } from './domain/service/movements/transfer-lot.service';

// ======================================================
// TRANSACTION MODULE
// ======================================================
import { LotTransactionModule } from '../lot-transaction/lot-transaction.module';

// ===========================
// 
// ==========================
import { InventoryOrchestratorService } from './commit/Inventory-orchestrator.service';


@Module({
  imports: [
    LotTransactionModule,
  ],

  controllers: [
    LotBalanceController,
  ],

  providers: [
    PrismaService,

    // MAIN SERVICE
    LotBalanceService,

    // MOVEMENTS
    AdjustLotService,
    ReceiveLotService,
    IssueLotService,
    ReserveLotService,
    ReleaseLotService,
    TransferLotService,

    InventoryOrchestratorService,
  ],

  exports: [
    LotBalanceService,

    AdjustLotService,
    ReceiveLotService,
    IssueLotService,
    ReserveLotService,
    ReleaseLotService,
    TransferLotService,
    
    InventoryOrchestratorService, // เป็นฟังชั่นรวมการจัดการข้อมูล
  ],
})
export class LotBalanceModule {}