import { IcOptionReader } from './src/common/inventory/option/infrastructure/ic-option.reader';

async function test() {
  const result = await IcOptionReader.getOption('DLVRY');

  console.log(result);
}

test();