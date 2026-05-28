import { InventoryOrchestratorService } from '../../src/common/inventory/lot-balance/commit/Inventory-orchestrator.service';


async function test() {
  const result = await InventoryOrchestratorService.process({
        system_document_code: "DLVRY",
        doc_type_no: 1,

        // doc_type: string,
        // ref_doc_no: string,

        // ---- commit ----
          lot_id: 1,
          item_lot_balance_id: 1,
          qty: 20000,
  });

  console.log(result);
}


test();