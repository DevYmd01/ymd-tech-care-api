import { UomConversionReader }  from '../../src/common/inventory/option/infrastructure/uom-conversion';

async function test() {
  const result = await UomConversionReader.toBaseQty(21, 1);
  console.log(result);
}

test();