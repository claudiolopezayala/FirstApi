import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'usuarios' })   //patron de diseño para la base de datos
export default class Usuario {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false })
    public usuario: string;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public password: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public nombreCompleto: string;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    // public constructor(id: number, usuario: string, password: string,nombreCompleto: string){
    //     this.id = id;
    //     this.usuario = usuario;
    //     this.password = password;
    //     this.nombreCompleto = nombreCompleto;
    //     this.fechaCreacion = new Date;
    //     this.fechaActualizacion = new Date;
    // }
}