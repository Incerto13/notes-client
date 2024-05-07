import { useState } from 'react'
import { Button, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import styled from 'styled-components';
import NotesFilters from '../components/NotesFilters';
import NotesList from '../components/NotesList';
import '../App.css'

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



function NotesPage() {
  const [search, setSearch] = useState('')
  const [selectedLabelId, setSelectedLabelId] = useState('')

  return (
    <>
    <TasksWrapper>
    <TasksHeader>
      <Title>Solace Notes</Title>

      <CreateButtonContainer>
        <Fab
          variant="extended"
          onClick={() => window.location.pathname = '/notes/new'}
        >
          <AddIcon />
          Create Note
        </Fab>
        <Fab 
          style={{ marginLeft: '15px' }}
          variant="extended"
          onClick={() => window.location.pathname = '/labels'}
        >
          Labels
        </Fab>
      </CreateButtonContainer> 
    </TasksHeader>

    <NotesFilters  
      search={search} setSearch={setSearch}
      selectedLabelId={selectedLabelId} setSelectedLabelId={setSelectedLabelId}
    />

    <TasksContainer>
      <NotesList search={search} selectedLabelId={selectedLabelId} />
    </TasksContainer>
  </TasksWrapper>
  </>
  )
}

export default NotesPage
