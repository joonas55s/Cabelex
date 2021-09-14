import { makeStyles } from '@material-ui/styles';
import styled from 'styled-components';

export const ComboBox = makeStyles(theme => ({
  
    inputRoot: {
      borderRadius:"10px",
      height:"45px",
      
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      display:"flex",

      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
        borderColor: "rgba(0,0,0,0.4)",
        
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
        borderColor: "rgba(0,0,0,1)"
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderWidth: "2px",
        borderColor: "#6B11E2"
        
      }
      
    },
  
}));
export const Container = styled.div`
  position:relative;
  
`;
export const Header = styled.div`
  margin-top:20px;
  margin-bottom:20px;
`;
export const Content = styled.div`
  grid-area:CON;
  display:flex;
  width:100%;
  justify-content:center;
  flex-direction:column;
  padding:30px 50px 0 50px;
  overflow-y:scroll;
  background-color:#F8F8F8;
  
  ::-webkit-scrollbar {
    width: 10px;
    
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    
    background: var(--buttonHover); 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary); 
  }
`;

export const Filial = styled.div`
    display:flex;
    width:100%;
    flex:1;
    padding-top:40px;
    form{
      
      display:flex;
      height:100%;
      width:100%;
      justify-content:space-between;
      flex-direction:column;

      >div{
        display:flex;
        justify-content:end;
        button + button{
            margin-left:10px;
        } 
      }
    }
`;