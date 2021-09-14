import MaterialTable from 'material-table';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Contributors from '../../components/Contributors';
import Filiais from '../../components/Filiais';
import Layout from '../../components/Layout';
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';
import { Container,Content } from './styles';



const Dashboard: React.FC = () => {
  const [filiais,setfiliais] = useState<boolean>(true);
  const [contributors,setcontributors] = useState<boolean>();
  const [topbarTitle,setTopbarTitle] = useState<string>("Filiais");
  function Select(option:"filiais"|"contributors") {

    switch(option){
      case 'filiais':{
        setfiliais(true);
        setcontributors(false);
        setTopbarTitle("Filiais");
        break;
      }
      case 'contributors':{
        setcontributors(true);
        setfiliais(false);
        setTopbarTitle("Funcionários");
        break;
      }
    }
 
  }
  return (
    <Container>
      <Layout> 
          
          {filiais && <Filiais/>}
          {contributors && <Contributors/>}
          <TopBar title={topbarTitle}/>
          <SideBar
          filiais={()=>{Select("filiais")}}
          contributors={()=>{Select("contributors")}}
          />
      </Layout>
    </Container>
  );
}

export default Dashboard;