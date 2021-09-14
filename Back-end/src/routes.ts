import {Router} from 'express';
import {CreateUsersController} from './controllers/CreateUsersController';
import { AuthenticateUserController } from './controllers/AuthenticateUserController';
import { CreateFiliasController,ListFiliaisController,GetFilialFuncionariosController,UpdateFilialController,DeleteFilialController } from './controllers/FiliasController';
import { CreateEmployeesController,ListEmployeesController,DeleteEmployee,UpdateEmployeesController } from './controllers/EmployeesController';
import {EnsureAuthenticated} from './middleware/EnsureAuthenticated';

const router = Router();

const createUserController = new CreateUsersController();
const authenticateUserController = new AuthenticateUserController();
const createFiliasController = new CreateFiliasController();
const listFiliaisController = new ListFiliaisController();
const createEmployeesController = new CreateEmployeesController();
const listEmployeesController = new ListEmployeesController();
const updateFilialController = new UpdateFilialController();
const deleteFilialController = new DeleteFilialController();
const updateEmployeesController = new UpdateEmployeesController();
const getFilialFuncionariosController = new GetFilialFuncionariosController();
const deleteEmployee = new DeleteEmployee();

router.post('/users',createUserController.handle);
router.post("/login",authenticateUserController.handle);
router.post("/filiais",EnsureAuthenticated,createFiliasController.handle);
router.post("/funcionarios",EnsureAuthenticated,createEmployeesController.handle);

router.get("/filiais",EnsureAuthenticated,listFiliaisController.handle);
router.get("/filial",getFilialFuncionariosController.handle);
router.get("/allfuncionarios",EnsureAuthenticated,listEmployeesController.handle);

router.put("/filiais",EnsureAuthenticated,updateFilialController.handle);
router.put("/funcionarios",EnsureAuthenticated,updateEmployeesController.handle);

router.delete("/filiais",EnsureAuthenticated,deleteFilialController.handle);
router.delete("/funcionarios",EnsureAuthenticated,deleteEmployee.handle);


export {router};