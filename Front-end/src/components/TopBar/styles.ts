import styled from 'styled-components';
import Avatar from '../../assets/avatar.jpg';

export const Container = styled.div`
    grid-area:BAR;
    background-color:var(--white);
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:0 20px;
    h1{
        font-weight:bold;
        font-size:26px;
        color:#3A097D;
    }
    
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
`;

export const Button = styled.div`
    cursor:pointer;
    font-size:20px;
    border-bottom:1px solid transparent;
    transition:border-bottom 0.2s;
    :hover{
        border-bottom:1px solid var(--darktext);
    }

`;
export const ContentAvatar = styled.div`

    height:50px;
    width:50px;
    background-color:var(--darktext);
    background-image:url(${Avatar});
    background-size:cover;
    background-position:center;
    border-radius:50%;
`;

export const UserButton = styled.button`
    display:flex;
    cursor:auto;
    align-items:center;
    justify-content:space-between;
    width:100%;
    background-color:transparent;
    outline:none;
    border:0px;
    >strong{
        border-bottom:1px solid transparent;
        transition:border-bottom 0.2s;
        :hover{
            border-bottom:1px solid var(--darktext);
        }
    }
    font-size:20px;
    
`;

export const Controls = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:180px;
`;

export const Title = styled.div`
    color:var(--white);
    font-size:25px;
`;
export const ButtonNavigation = styled.button`
    position:relative;
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
`;
export const Options = styled.div`

    position:absolute;
    padding :10px;
    display:flex;
    justify-content:center;
    margin-top:100px;
    z-index:100;
    width:160px;
    border-radius:0 0 5px 5px;
    background-color:var(--white);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    
`;