import styled, { css } from 'styled-components';

interface props{
    stylecolor: "ok" | "cancel" | "other" | "transparent";
}
export const Container = styled.button<props>`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:45px;
    justify-content:center;
    align-items:center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    border:0px;
    transition: background 0.3s;
    strong{
        color:var(--primary);
        font-weight:bold;
        font-size:20px;
    }
    ${props => props.stylecolor =="ok" && css `
        background-color:var(--ok);
        :hover{
            background-color:var(--okHover);
        }
    `}
    ${props => props.stylecolor =="cancel" && css `
        background-color:var(--error);
        :hover{
            background-color:var(--errorHover);
        }
    `}
    ${props => props.stylecolor =="other" && css `
        background-color:var(--secondary);
        :hover{
            background-color:var(--buttonHover);
        }
    `}
    ${props => props.stylecolor =="transparent" && css `
        background-color:transparent;
        border:1px solid var(--secondary);
        :hover{
            border-color:var(--buttonHover);
        }
        strong{
            color:var(--darktext);
        }
    `}
   
    



`;
