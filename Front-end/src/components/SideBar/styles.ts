import styled from 'styled-components';
import LOGO from '../../assets/LOGO.png';
export const Container = styled.div`
  grid-area:SID;
  background-color:var(--bar);
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:20px;
`;
export const ButtonNavigation = styled.button`
    display:flex;
    align-items:center;
    
    color:var(--white);
    background-color:transparent;
    font-size:20px;
    border:none;
    outline:none;
    border-bottom:1px solid transparent;
    transition:border-bottom 0.2s;
    :hover{
        border-bottom:1px solid var(--white);
    }
    width:100%;
`;

export const Logo = styled.div`
  width:120px;
  height:120px;
  background-image:url(${LOGO});
  background-size:cover;
`;

export const ContentButtons = styled.div`
    display:flex;
    height:80px;
    margin-top:150px;
    background-color:transparent;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-start;
    
    
`;