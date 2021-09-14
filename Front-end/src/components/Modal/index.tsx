import React from 'react';

import { Container,Content } from './styles';

interface Props {
    isVisible: boolean;
    title:string;
    close?:void;

}
const Modal: React.FC<Props> = ({ isVisible,title,children,close }) => {
    return (
        <Container>
            <Content>
                <h1 style={{fontWeight:"bold"}}>{title}</h1>
                {children}
            </Content>
        </Container >
    );
}

export default Modal;