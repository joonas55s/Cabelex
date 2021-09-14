import {createGlobalStyle} from 'styled-components';

export default createGlobalStyle`

*{
    margin:0;
    padding:0%;
    box-sizing:border-box;
    outline:0;
}
html,body, #root{
    height:100%;

}

body, input ,button{
    font-family: 'Inter', sans-serif;
    font-size:16px;
    -webkit-font-smoothing: antialiased;
    outline:none;
    
}
h1,h2,h3,h4,h5,h6,strong,label{
     font-weight:500;
     -webkit-font-smoothing: antialiased;
     

 }
 button{
     cursor:pointer;
 }
:root{
    --primary:#ffff;
    --secondary:#6B11E2;
    --buttonHover:#7147F9;
    --error:#FF5959;
    --errorHover:#FF2020;
    --white:#ffff;
    --bar:#6B11E2;
    --ok:#01E05A;
    --okHover:#01A743;
    --darktext:#424242;
}



`;