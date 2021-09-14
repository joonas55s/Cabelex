import { Exclude } from "class-transformer";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from 'uuid';
import { Filiais } from "./Filiais";
@Entity("funcionarios")
export class Funcionarios {
    @PrimaryColumn()
    readonly id:string;

    @Column()
    name:string;
    
    @Exclude()
    @Column()
    filial_id:string;

    @JoinColumn({name:"filial_id"})
    @OneToOne(()=>Filiais)
    filial:Filiais;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
        
    }
}
