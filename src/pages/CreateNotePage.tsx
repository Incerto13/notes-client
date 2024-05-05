import React, { Component, useEffect, useState } from 'react';
import { FormControl, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteFormData, NoteSchema, ValidFieldNames } from "../types";
import FormField from "../components/FormField";
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

function CreateNotePage() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteSchema), // Apply the zodResolver
  });

  const [apiErrorMsg, setApiErrorMsg] = useState<string>('')
  const [displayApiErrorMsg, setDisplayApiErrorMsg] = useState(false)

  const onSubmit = async (note: NoteFormData) => {
    try {
      const response = await createNote(note.value)
      const { errors = {} } = response; // Destructure the 'errors' property from the response data

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidFieldNames> = {
        value: "value",
      };

      // Find the first field with an error in the response data
      const fieldWithError = Object.keys(fieldErrorMapping).find(
        (field) => errors[field]
      );

      // If a field with an error is found, update the form error state using setError
      if (fieldWithError) {
        // Use the ValidFieldNames type to ensure the correct field names
        setError(fieldErrorMapping[fieldWithError], {
          type: "server",
          message: errors[fieldWithError],
        });
      }

      window.location.pathname = '/'; // back to homepage after successful submission

    } catch (error: any) {
      handleApiError(error)
    }
};

  // TODO: put this in custom hook that displays the Error modal
  const handleApiError = (error: any) => {
    console.error(error)
    const message = error?.response?.data?.message
    setApiErrorMsg(message)
  };
  useEffect(() => {
    if (apiErrorMsg) {
      setDisplayApiErrorMsg(true)
    }
  })

    return (
    <>
      { displayApiErrorMsg && <ErrorMessage message={apiErrorMsg} /> }

        <FormWrapper>
          <FormContainer>
            <h1>Create a new note</h1>

            {/* { errorMessage && <ErrorMessage message={errorMessage} />} */}

            <FormControl fullWidth>
            </FormControl>
      
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <FormField
                  name="value"
                  placeholder="Type Note here"
                  type="text"
                  register={register}
                  error={errors.value}
                />
              </FormControl>

              <Button
                type="submit"
                style={{ marginTop: '10px' }}
                fullWidth
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </form>

          </FormContainer>
        </FormWrapper>
      </>
    );
}

export default CreateNotePage;
