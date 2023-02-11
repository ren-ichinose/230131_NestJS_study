import { Item } from "src/entities/item.entity";
import { User } from "src/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreatItemDto } from "./dto/creat-item.dto";
import { ItemStatus } from "./item-status.enum";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
    async creatItem (creatItemDto: CreatItemDto, user: User): Promise<Item> {
        const { name, price, description } = creatItemDto;
        const item = this.create({
            name,
            price,
            description,
            status: ItemStatus.ON_SALE,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user
        })
        await this.save(item);
        return item;
    }
}