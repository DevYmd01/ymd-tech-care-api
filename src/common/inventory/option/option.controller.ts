import { Controller, Post, Body} from '@nestjs/common';
import { IcOptionContext } from './domain/ic-option.types';
import { IcOptionValidationService } from './application/ic-option-validation.service';



@Controller('option')
export class OptionController {
    
  constructor(
    private readonly icOptionValidationService: IcOptionValidationService,
  ) {}

//   ตรวจสอบแล้วแต้งเตือนการเลือกใช้งาน lot ตามการตั้งค่าของ ic 
  @Post('validate')
  async validate(
    @Body()
    params: {
      system_document_id: number;
      context: IcOptionContext;
    },
  ) {
    return await this.icOptionValidationService.validate(params);
  }

}
