import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';

import { Container, Button, ContentAvatar, UserButton, Controls, Title, Options } from './styles';
import { IoMdArrowDropdown } from 'react-icons/io'

interface PropsTopBar {
    title: string;
}
const TopBar: React.FC<PropsTopBar> = ({ title }) => {
    const [openOptions, setOpenOptions] = useState<boolean>(false);
    const { user } = useAuth();
    const { singOut } = useAuth();
    return (
        <Container>
            <h1>
                {title}
            </h1>
            <Title>

            </Title>
            <Controls>

                <UserButton >
                    <strong>{user.name}</strong>
                    <ContentAvatar />
                    
                </UserButton>
                <IoMdArrowDropdown style={{width:80,cursor:"pointer"}} onClick={() => setOpenOptions(!openOptions)} />
                {openOptions && (
                    <Options>
                        <Button style={{height:25}} onClick={singOut} >Sair</Button>
                    </Options>
                )}

            </Controls>
        </Container>
    );
}

export default TopBar;