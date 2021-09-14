import styled from 'styled-components';

export const Container = styled.div`
  position:absolute;
  height:100%;
  width:100%;
  background-color:rgba(0,0,0,0.5);
  z-index:100;
  display:flex;
  justify-content:center;
  align-items:center;
`;

export const Content = styled.div`
    width:min(800px,100%);
    height:min(550px,100%);
    background-color:var(--white);
    border-radius:5px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-direction:column;
    padding:20px;

`;
