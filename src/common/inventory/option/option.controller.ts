import { Controller, Post, Body } from '@nestjs/common';
import { IcOptionValidationService } from './application/ic-option-validation.service';
import { ValidateOptionRequestDto } from './dto/validate-option-request.dto';

@Controller('option')
export class OptionController {

  constructor(
    private readonly icOptionValidationService: IcOptionValidationService,
  ) {}

  @Post('validate')
  async validate(
    @Body() params: ValidateOptionRequestDto,
  ) {
    return this.icOptionValidationService.validate(params);
  }

}