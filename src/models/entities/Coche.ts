import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'coches' })
export default class Coche {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false})
    public marca: string;

    @Column({ type: 'varchar', length: 20, nullable: false})
    public modelo: string;
}