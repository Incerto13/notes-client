import React, { Component, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, Button } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteFormData, NoteSchema, ValidFieldNames } from "../types";
import FormField from "../components/FormField";
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import { createNote, getNote } from '../api/notes';
import { useQuery } from 'react-query';

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

function EditNotePage() {

  const { id } = useParams();

  const { data, isLoading } = useQuery('notes', async () => {
    return await getNote(id)
})
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteSchema), // Apply the zodResolver
  });


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
    } catch (error) {
      console.error(error)
      alert("Submitting form failed!"); // TODO: replace with Error Modal
    }
  window.location.pathname = '/'; // back to homepage after successful submission
};

if (isLoading || !data) {
  return <div>Loading...</div>
}

    return (
      <FormWrapper>
        <FormContainer>
          <h1>Edit note</h1>

          {/* { errorMessage && <ErrorMessage message={errorMessage} />} */}

          <FormControl fullWidth>
          </FormControl>
     
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <FormField
                name="value"
                placeholder="Type Note here"
                type="text"
                defaultValue={data?.value}
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
    );
}

export default EditNotePage;
