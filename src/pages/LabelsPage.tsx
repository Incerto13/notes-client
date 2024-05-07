import { useState } from 'react'
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import NotesFilters from '../components/NotesFilters';
import NotesList from '../components/NotesList';
import '../App.css'
import LabelsList from '../components/LabelsList';

const TasksWrapper = styled.div`
  width: 100%;
  max-width: 860px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
`;

const TasksHeader = styled.div`
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

const TasksContainer = styled.div`
  padding-top: 20px;
`;


function LabelsPage() {
  const [search, setSearch] = useState('')

  return (
    <TasksWrapper>
    <TasksHeader>
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
    </TasksHeader>

    <TasksContainer>
      <LabelsList search={search} />
    </TasksContainer>
  </TasksWrapper>
  )
}

export default LabelsPage
