import { Item } from "src/entities/item.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatItemDto } from "./dto/creat-item.dto";
import { ItemStatus } from "./item-status.enum";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{
    async createItem (creatItemDto: CreatItemDto): Promise<Item> {
        const { name, price, description} = creatItemDto;
        const item = this.create({
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        })
        await this.save(item);
        return item;
    }
}