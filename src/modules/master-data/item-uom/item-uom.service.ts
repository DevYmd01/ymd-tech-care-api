import { Injectable } from '@nestjs/common';
import { ItemUomRepository } from './repository/item-uom.repository';
import { ItemUomMapper } from './mapper/item-uom.mapper';
import { CreateItemUomDto } from './dto/item-uom.dto';

@Injectable()
export class ItemUomService {

    constructor(
        private readonly itemUomRepository: ItemUomRepository,
    ) {}

    async createItemUom(dto: CreateItemUomDto) {

        const data = ItemUomMapper.toCreate(dto);

        const created = await this.itemUomRepository.create(data);

        return ItemUomMapper.toResponse(created);
    }

    async getAllItemUom() {

        const list = await this.itemUomRepository.findAll();

        return list.map(item =>
            ItemUomMapper.toResponse(item)
        );
    }

    async getItemUomById(item_uom_id: number) {

        const found = await this.itemUomRepository.findById(item_uom_id);

        return ItemUomMapper.toResponse(found);
    }

    async updateItemUom(
        item_uom_id: number,
        dto: CreateItemUomDto,
    ) {

        const data = ItemUomMapper.toUpdate(dto);

        const updated = await this.itemUomRepository.update(
            item_uom_id,
            data,
        );

        return ItemUomMapper.toResponse(updated);
    }


    async getItemUomByItemId(item_id: number) {

        const list = await this.itemUomRepository.findByItemId(item_id);

        return list.map(item =>
            ItemUomMapper.toResponse(item)
        );
    }
}