import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn({type: 'varchar', length: 36})
    id: string;

    @Index()
    @Column({type: 'varchar', length: 150, unique: true})
    email: string;

    @Column({type: 'varchar', length: 150})
    password: string;

    @Column({default: false})
    isActive: boolean;
}
