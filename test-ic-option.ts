import { IcOptionValidationService } from './src/common/inventory/option/application/ic-option-validation.service';

async function test() {

  const service = new IcOptionValidationService();

  const result =
    await service.validate({
      system_document_code: 'DLVRY',
      context: {
        item_id: 1,
        warehouse_id: 1,
        location_id: 1,
        qty: 200,
        item_uom_id: 20,
        // available_qty: 5,
        system_document_code: 'DLVRY',
        // system_document_id: 105,
      },
    });

  console.log(result);
}

test();