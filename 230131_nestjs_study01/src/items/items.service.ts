import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {
    findAll(): string {
        return 'Items Service';
    }
}
