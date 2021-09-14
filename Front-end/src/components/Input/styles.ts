import styled,{css} from 'styled-components';
import Tootip from '../Tooltip';
interface ContainerProps{
    isFocused:boolean,
    isFilled:boolean,
    isError:boolean
}
export const Container = styled.div<ContainerProps>`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:45px;

    border: 2px solid rgba(0,0,0,0.4);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    padding:0 20px;
    input{
        flex:1;
        background:transparent;
        color:var(--text);
        border:none;
        &::placeholder{
            color:var(--border);
            opacity:0.2;
        }
    }
    transition: border 0.3s;
    ${props => !props.isError && css `
        :hover{
            border: 2px solid rgba(0,0,0,1);
        }
    `}
    
    
    svg{
      width:16px;
      height:16px;
      margin-right:5px;
      color:var(--border);
      opacity:0.8;
    }
    ${props => props.isError && css `
        border-color:var(--error);
        svg{
        color:var(--error);
        opacity:0.8;
        }
    `}
    ${props => props.isFocused && css `
        border:2px solid var(--secondary);
        svg{
        color:var(--secondary);
        opacity:0.8;
        }
    `}
    ${props => props.isFilled && css `
        svg{
        color:var(--secondary);
        opacity:0.8;
        }
    `}
`;

export const DivError = styled(Tootip)`
    /* height:80px; */
    margin-left:16;
    svg{
        margin:0;
    }
`;