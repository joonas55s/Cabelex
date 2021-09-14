import react, {createContext,useContext} from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import api from '../services/Apiclient';


interface SingInCredentials{
    email:string,
    password:string;
}
interface AuthContextData{
    user:User;
    singIn(credentials:SingInCredentials):Promise<void>;
    singOut():void;
}

interface User{
    id: string,
    name: string,
    email: string,
}
interface AuthState{
    token:string;
    user:User;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);


export const AuthProvider : React.FC =({children})=>{
    const [data,setData] = useState<AuthState>(()=>{
        const token =localStorage.getItem('@cabelex:token');
        const user =localStorage.getItem('@cabelex:user');
        
        if(token && user){
            api.defaults.headers.authorization =`Bearer ${token}`;
            return {token,user: JSON.parse(user)};
        }
        return {} as AuthState;
    });
    const singIn = useCallback(async ({email,password})=>{
        const response = await api.post('login',{email,password});

        const {token, user } = response.data;
        localStorage.setItem('@cabelex:token',token);
        localStorage.setItem('@cabelex:user',JSON.stringify(user));

        api.defaults.headers.authorization =`Bearer ${token}`;
        setData({token,user});
    },[]);

    const singOut = useCallback(()=>{
        localStorage.removeItem('@cabelex:token');
        localStorage.removeItem('@cabelex:user');
        setData({}as AuthState);
    },[]);
    return(
        <AuthContext.Provider value={{user:data.user,singIn,singOut}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth():AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error ("useAuth must be used within a AuthProvider");
    }

    return context;
}
