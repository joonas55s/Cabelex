import React,{useCallback,useRef} from 'react';
import {Form} from '@unform/web';
import {FormHandles} from '@unform/core';
import { Container,Content } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Logo from '../../assets/Logo.png';
import * as yup from 'yup';
import GetvalidationErrors from '../../utils/getValidationerros';
import {Mail,Password} from 'styled-icons/material';
import LOGOPRETA from '../../assets/LOGOPRETA.png'

import {UseToast} from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';

interface SingInFormData{
  email:string,
  password:string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {singIn} = useAuth();
  const { addToast,removeToast } = UseToast();

  const handleSubmit = useCallback(async(data:SingInFormData) =>{
    try{
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        email:yup.string().required('E-mail obrigatório').email(),
        password:yup.string().min(6,'Mínimo 6 caracteres'),
      });
      
      await schema.validate(data,{abortEarly:false});
      await singIn({
        email:data.email,
        password:data.password
      });

    }catch(err){
      if(err instanceof yup.ValidationError){
        const erros = GetvalidationErrors(err);
        formRef.current?.setErrors(erros);
      }
      addToast({
        type:'error',
        title:'Erro ao autenticar usuário',
        description:'E-mail ou senha incorretos'
      });
    }
  },[addToast]);

  return(
  <Container>
      <Content>
          <img src={LOGOPRETA} style={{width:150,marginBottom:50}} />
          <Form  ref={formRef} onSubmit={handleSubmit} >
           
            {/* <h1>Cabelex</h1> */}
            <label>E-mail
              <Input icon={Mail} name="email" placeholder="E-mail..."></Input>
            </label>
            <label>Senha
              <Input icon={Password} name="password" type="password" placeholder="Senha..."></Input>
            </label>
            <Button stylecolor="other" type="submit" style={{marginTop:20}} label="Entrar"/>
          </Form>
      </Content>
  </Container>
  );
}

export default SignIn;