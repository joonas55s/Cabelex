import {Request,Response}from 'express';
import { AuthenticateUserService } from '../services/AuthenticateUserService';


class AuthenticateUserController{
     async handle(request:Request,response:Response){
         const {email,password} = request.body;

         const authenticateUserService = new AuthenticateUserService();
         const emaillow = email.toLowerCase();
         const passwordlow = password.toLowerCase();
         const resp = await authenticateUserService.execute({email:emaillow,password:passwordlow});

         return response.json(resp);
     }
}

export {AuthenticateUserController};