import { useState } from 'react'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import LabelsList from '../../components/labels/LabelsList';
import '../../App.css'


const Wrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
  display: flex;
  width: 100%;
  color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Container = styled.div`
  padding-top: 20px;
`;


function LabelsPage() {
  const [search, setSearch] = useState('')

  return (
    <Wrapper>
    <Header>
      <Title>Solace Labels</Title>

      <CreateButtonContainer>
        <Fab
          variant="extended"
          onClick={() => window.location.pathname = '/labels/new'}
        >
          <AddIcon />
          Create Label
        </Fab>

        <Fab 
          style={{ marginLeft: '15px' }}
          variant="extended"
          onClick={() => window.location.pathname = '/'}
        >
          Notes
        </Fab>

      </CreateButtonContainer> 
    </Header>

    <Container>
      <LabelsList search={search} />
    </Container>
  </Wrapper>
  )
}

export default LabelsPage
