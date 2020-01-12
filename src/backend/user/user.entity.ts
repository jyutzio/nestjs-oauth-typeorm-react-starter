import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
  readonly id: number;
  readonly username: string;
  readonly dateCreated: string;
  readonly dateModified: string;
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @IsNotEmpty()
  @Exclude()
  provider: string;

  @Column('text')
  @IsNotEmpty()
  @Exclude()
  providerId: string;

  @Column('text')
  @IsNotEmpty()
  username: string;

  @Column('text')
  @CreateDateColumn()
  dateCreated: Date;

  @Column('text')
  @UpdateDateColumn()
  dateModified: Date;
}
