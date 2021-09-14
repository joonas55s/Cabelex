import styled from 'styled-components';

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
        justify-content:flex-start;
        flex-direction:column;
        button + button{
            margin-left:10px;
        } 
      }
      label + label{
        margin-top:20px;
      }
      .controls{
        display:flex;
        flex-direction:row;
      }
      
    }

`;

export const TableContent = styled.div`
  width:100%;
  overflow-y:scroll;
  
  ::-webkit-scrollbar {
    width: 10px;
    
  }

  ::-webkit-scrollbar-track {
   
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track:hover {
    box-shadow: inset 0 0 5px grey; 

  }
  ::-webkit-scrollbar-thumb {
    
    background: var(--buttonHover); 
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary); 
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th{
    border: 1px solid #ffff;
    padding: 8px;
    background-color: rgba(113,71,249,0.3);
    text-align: left;
    text-transform:uppercase;
  }
  td {
    border: 1px solid #ffff;
    text-align: left;
    padding: 8px;
    width:100%;
    background-color: rgba(113,71,249,0.08);
  }
  tr:nth-child(even) {
    background-color: rgba(113,71,249,0.1);
  }
`;