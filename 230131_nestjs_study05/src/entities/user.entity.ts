import { Exclude } from 'class-transformer';
import { UserStatus } from 'src/auth/user-status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  status: UserStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany(() => Item, (item) => item.id)
  item: Item[];
}
