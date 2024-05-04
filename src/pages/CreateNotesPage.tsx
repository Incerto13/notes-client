import React, { Component, useState } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import { createNote } from '../api/notes';

const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

function CreateNotesPage() {
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmitNote = async () => {


    try {
      await createNote(value);
      window.location.pathname = '/';
    } catch (error) {
      // const errorMessage = error.message
      console.error(error)
      // setErrorMessage(errorMessage);
    }
  };

    return (
      <FormWrapper>
        <FormContainer>
          <h1>Create a new task</h1>

          { errorMessage && <ErrorMessage message={errorMessage} />}

          <FormControl fullWidth>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="note"
              placeholder="Type Note here"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={e => setValue(e.target.value)}
            />
          </FormControl>

          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmitNote}
          >
            Create Note
          </Button>
        </FormContainer>
      </FormWrapper>
    );
}

export default CreateNotesPage;
