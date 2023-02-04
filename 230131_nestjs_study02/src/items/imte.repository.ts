import { Item } from "src/entities/item.entity";
import { EntityRepository, Repository } from "typeorm"
import { CreatItemDto } from "./dto/creat-item.dto";
import { ItemStatus } from "./item-status.enum";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item>{
    async creatItem(createItemDto: CreatItemDto): Promise<Item> {
        const { name, price, description } = createItemDto;
        const item = this.create({
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        await this.save(item)
        return item;
    }
}