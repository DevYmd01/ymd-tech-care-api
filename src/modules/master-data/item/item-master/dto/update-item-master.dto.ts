import { PartialType } from "@nestjs/mapped-types";
import { CreateItemMasterDto } from "./create-item-master.dto";

export class UpdateItemMasterDto extends PartialType(CreateItemMasterDto) {

}
