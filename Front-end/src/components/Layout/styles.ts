import styled from 'styled-components';

export const Grid = styled.div`
   display:grid;

    grid-template-rows: 60px auto;
    grid-template-columns:200px auto;

    grid-template-areas:
    "SID BAR"
    "SID CON";
    height:100vh;
`;
