import React from 'react';

import { Container, ButtonNavigation, Logo,ContentButtons } from './styles';
import { IoIosPeople } from 'react-icons/io';
import { BiBuildings } from 'react-icons/bi';
interface propsSidBar {
  filiais: () => void;
  contributors: () => void;
}

const SideBar: React.FC<propsSidBar> = ({ filiais, contributors }) => {
  return (
    <Container>
      <Logo />
      <ContentButtons>
        <ButtonNavigation onClick={filiais}>
          <BiBuildings size="35" style={{marginRight:10}} />
          Filiais
        </ButtonNavigation>

        <ButtonNavigation onClick={contributors}>
          <IoIosPeople size="35" style={{marginRight:10}} />
          Funcionários
        </ButtonNavigation>
      </ContentButtons>

    </Container>
  );
}

export default SideBar;