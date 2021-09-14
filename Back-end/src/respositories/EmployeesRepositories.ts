import {EntityRepository,getCustomRepository,Repository} from "typeorm";
import {Funcionarios} from '../entities/Employees';
import { FiliaisRepositories } from "./FiliaisRepositories";

@EntityRepository(Funcionarios)
class EmployeesRepositories extends  Repository<Funcionarios>{
    
}

export {EmployeesRepositories};