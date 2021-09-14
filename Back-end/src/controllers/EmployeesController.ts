import{Request,Response} from 'express';
import { DeleteEmployeesService,EmployeesService, ListEmployeesService, FindEmployeesByFiliaisService, UpdateEmployeesService} from '../services/EmployeesService';

class CreateEmployeesController{

    async handle(request:Request,response:Response){
        
        const{name,filial_id} = request.body;
        const createEmployeesService = new EmployeesService();

        const employees = await createEmployeesService.execute({name,filial_id});
        
        return response.json(employees[0]);
    }
    
}

class ListEmployeesController{
    async handle(request:Request,response:Response){
        const listEmployeesServices = new ListEmployeesService();

        const employees = await listEmployeesServices.execute();

        return response.json(employees);
    }
}
class UpdateEmployeesController{
    async handle(request:Request,response:Response){
        const { name, id,filial_id } = request.body;
        const updateEmployeesService = new UpdateEmployeesService();

        const employee = await updateEmployeesService.execute(id, name, filial_id);

        return response.json(employee);
    }
}

class DeleteEmployee{
    async handle(request:Request,response:Response){
        
        const { id } = request.query;
        const deleteEmployeesService =new DeleteEmployeesService();
        return response.json(deleteEmployeesService.execute(id.toString()));
    }
}

export {DeleteEmployee,UpdateEmployeesController,ListEmployeesController,CreateEmployeesController};