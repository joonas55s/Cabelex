import { getCustomRepository } from "typeorm";
import {compare} from 'bcryptjs';
import { UsersRepositories } from "../respositories/UserRepositories";
import {sign} from 'jsonwebtoken';
import { classToPlain } from "class-transformer";

interface AuthenticateRequestProps{
    email:string;
    password:string;
}

class AuthenticateUserService{
    async execute({email,password}:AuthenticateRequestProps){
        const userRepositories = getCustomRepository(UsersRepositories);

        const user = await userRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("email/password incorrect");
        }

        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            throw new Error("email/password incorrect");
        }

        
        const token = sign({},"cheve secreta",{
            subject: user.id,
            expiresIn:"1d"
        });

        const response = [{
            user:user,
            token:token
        }]
        return classToPlain(response[0]);
    }
}

export {AuthenticateUserService};