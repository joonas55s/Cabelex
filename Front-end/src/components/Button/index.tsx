import React,{ButtonHTMLAttributes} from 'react';

import { Container } from './styles';

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  label:string;
  stylecolor: "ok" | "cancel" | "other" | "transparent";
  icon?:React.ComponentType;
}
const Button: React.FC <InputProps> = ({label,icon : Icon,style,stylecolor,...rest}) => {
  return (
      <Container style={style} {...rest} stylecolor={stylecolor}>
        {Icon &&
        <Icon/>
        }
        <strong style={{fontSize:style?.fontSize}}>{label}</strong>
      </Container>
  );
}

export default Button;