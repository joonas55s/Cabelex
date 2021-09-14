import styled from 'styled-components';
import background from '../../assets/background.jpg';

export const Container = styled.div`
  display:flex;
  padding:0px;
  margin:0px;
  flex:1;
  height:100vh;
  background-image:url(${background});
  background-size:cover;
  
`;

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    width:min(601px,100%);
    height:100vh;
    background-color:#ffff;
    justify-content:center;
    align-items:center;

    form{
        display:flex;
        flex-direction:column;
        width:300px;
        height:250px;
        justify-content:space-between;
    }

    
`; 