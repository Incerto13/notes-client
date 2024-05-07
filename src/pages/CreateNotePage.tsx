import { useEffect, useState } from 'react';
import { FormControl, Button, InputLabel, Checkbox, ListItemText, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, NoteFormData, NoteSchema, ValidNoteFieldNames } from "../types";
import { NoteFormField } from "../components/FormFields";
import styled from 'styled-components';
import ErrorMessage from '../components/ErrorMessage';
import { createNote } from '../api/notes';
import { useQuery } from 'react-query';
import { getLabels } from '../api/labels';

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

  const [apiErrorMsg, setApiErrorMsg] = useState<string>('')
  const [displayApiErrorMsg, setDisplayApiErrorMsg] = useState(false)

  const getLabelsQuery = useQuery('labels', async () => {
    return await getLabels()
  })

  const [labels, setLabels] = useState<Label[]>([])
  const [selectedLabelNames, setSelectedLabelNames] = useState([])
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([])

  useEffect(() => {
    if (getLabelsQuery.data) {
      setLabels(getLabelsQuery.data)
    }
  },[getLabelsQuery.data])
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteSchema), // Apply the zodResolver
  });

  const handleChangeLabels = (e: any) => {
    const { value } = e.target

    setSelectedLabelNames(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  useEffect(() => {
    if (labels.length > 0) {
      const selectedIds = labels.filter((label: Label) => selectedLabelNames.includes(label.name)).map((label: Label) => label.id)
      setSelectedLabelIds(selectedIds)
    }
  },[selectedLabelNames])

  const onSubmit = async (note: NoteFormData) => {
    try {
      const response = await createNote(note.value, selectedLabelIds)
      const { errors = {} } = response; // Destructure the 'errors' property from the response data

      // Define a mapping between server-side field names and their corresponding client-side names
      const fieldErrorMapping: Record<string, ValidNoteFieldNames> = {
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

            <FormControl fullWidth>
            </FormControl>
      
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <NoteFormField
                  name="value"
                  placeholder="Type Note here"
                  type="text"
                  register={register}
                  error={errors.value}
                />
              </FormControl>

              <FormControl  fullWidth style={{ marginBottom: '50px' }}>
                <InputLabel id="demo-multiple-chip-label">Labels</InputLabel>
                <Select
                  value={selectedLabelNames}
                  onChange={handleChangeLabels}
                  multiple
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected: any) => selected.join(',  ')}
                >
                  {labels.map((label: Label) => label.name)?.map((name: string) => {
                      return (
                        <MenuItem key={name} value={name}>
                          <Checkbox checked={selectedLabelNames.includes(name)} />  
                          <ListItemText primary={name} />
                        </MenuItem>
                      )
                  })}
                </Select>
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
