import { EmployeesRepositories } from "../respositories/EmployeesRepositories";
import { getCustomRepository } from "typeorm";
import { classToPlain } from 'class-transformer';

interface Props {
    name: string;
    filial_id: string;
}

class EmployeesService {
    async execute({ name, filial_id }: Props) {

        const employeesRepositories = await getCustomRepository(EmployeesRepositories);

        if (!name) {
            throw new Error("Nome invalido");
        }
        const employeeAlreadyExist = await employeesRepositories.findOne({
            name
        });

        if (employeeAlreadyExist) {
            throw new Error("funcionário já existe");
        }

        const employeesave = employeesRepositories.create({
            name,
            filial_id,
        });

        await employeesRepositories.save(employeesave);

        const employee = await employeesRepositories.find({
            where: {
                id: employeesave.id
            },
            relations: ["filial"]
        });

        return employee;

    }
}

class ListEmployeesService {

    async execute() {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const employees = await employeesRepositories.find({
            relations: ["filial"]
        });

        return classToPlain(employees);


    }
}
class DeleteEmployeesService{
    async execute(id:string){
        if(!id){
            throw new Error("o campo id é requerido");
        }
        
        const employeesRepositories = getCustomRepository(EmployeesRepositories);
        
        const exist = employeesRepositories.findOne({
            where:{
                id:id
            }
        });
        if(!exist){
            throw new Error("Não foi encontrado nenhum funcionário com esse id");
        }
        employeesRepositories.delete({id:id});
        return "Filial deletada";
    }
}

class FindEmployeesByFiliaisService {

    async execute(filial_id: string) {
        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const employees = await employeesRepositories.find({
            where: {
                filial_id: filial_id
            },
        });

        return employees;
    }
}

class UpdateEmployeesService {
    async execute(id: string, name: string="", filial_id: string="") {

        if (!id) {
            throw new Error("o campo é id é requerido");
        }
        if (filial_id == null) {
            filial_id="";
        }

        const employeesRepositories = getCustomRepository(EmployeesRepositories);

        const exist = await employeesRepositories.findOne({id});

        if(!exist){
            throw new Error("id não existe");
        }

        if (name != "" && filial_id != "") {
           await employeesRepositories.update({ id: id }, { name: name, filial_id: filial_id });
        }else if(name != ""){
            await employeesRepositories.update({ id: id }, { name: name});
        }else{
            await employeesRepositories.update({ id: id }, { filial_id: filial_id });
        }
        
        const employees = await employeesRepositories.findOne({
            where: {
                id: id
            },
            relations: ["filial"]
        });
     

        return employees;
    }
}
export { DeleteEmployeesService,EmployeesService, ListEmployeesService, FindEmployeesByFiliaisService, UpdateEmployeesService };