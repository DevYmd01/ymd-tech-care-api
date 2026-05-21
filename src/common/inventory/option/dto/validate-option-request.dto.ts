import { IcOptionContextDto } from './option-validation.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ValidateOptionRequestDto {

  @IsString()
  system_document_code!: string;

  @ValidateNested()
  @Type(() => IcOptionContextDto)
  context!: IcOptionContextDto;

}