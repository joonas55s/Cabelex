import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from "typeorm";
import { Exclude } from "class-transformer";
import {v4 as uuid} from 'uuid';
@Entity("users")
export class User {
    @PrimaryColumn()
    readonly id:string;

    @Column()
    name:string;
    
    @Exclude()
    @Column()
    password:string;
    
    @Column()
    email:string;


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
