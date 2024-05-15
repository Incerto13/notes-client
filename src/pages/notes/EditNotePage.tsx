import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, Button, Select, MenuItem, OutlinedInput, InputLabel, ListItemText, Checkbox } from '@material-ui/core';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Label,  NoteFormData, NoteLabel, NoteSchema, ValidNoteFieldNames } from "../../types";
import { NoteFormField } from "../../components/common/FormFields";
import ErrorMessage from '../../components/common/ErrorMessage';
import { getNote, updateNote } from '../../api/notes';
import { getLabels } from '../../api/labels';

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

  const { id } = useParams<never>();
  const [apiErrorMsg, setApiErrorMsg] = useState<string>('')
  const [displayApiErrorMsg, setDisplayApiErrorMsg] = useState(false)

  const getNoteQuery = useQuery('notes', async () => {
    return await getNote(id)
  })
  const getLabelsQuery = useQuery('labels', async () => {
    return await getLabels()
  })

  const [labels, setLabels] = useState<Label[]>([])
  const [selectedLabelNames, setSelectedLabelNames] = useState([])
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>([])

  useEffect(() => {
    if (getLabelsQuery.data && getNoteQuery?.data) {
      const noteLabelIds = getNoteQuery.data.labels?.map((noteLabel: NoteLabel) => noteLabel.labelId)
      const preSelectedLabels = getLabelsQuery.data.filter((label: Label) => noteLabelIds.includes(label.id))
      const preselectedLabelNames = preSelectedLabels.map((label: Label) => label.name) 

      setLabels(getLabelsQuery.data)
      setSelectedLabelNames(preselectedLabelNames)
    }
  },[getLabelsQuery.data, getNoteQuery.data])
  
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
      const selectedIds = labels.filter((label: Label) => selectedLabelNames.includes(label.name as never)).map((label: Label) => label.id)
      setSelectedLabelIds(selectedIds)
    }
  },[selectedLabelNames])


  const onSubmit = async (note: NoteFormData) => {
    try {

      const response = await updateNote(id, note.value, selectedLabelIds)
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
    } catch (error) {
      handleApiError(error)
    }
  window.location.pathname = '/'; // back to homepage after successful submission
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

  if ((getNoteQuery.isLoading || getLabelsQuery.isLoading) || (!getNoteQuery.data  || !getLabelsQuery.data)) {
    return <div>Loading...</div>
  }

    return (
      <>   
        { displayApiErrorMsg && <ErrorMessage message={apiErrorMsg} /> }
        
        <FormWrapper>
          <FormContainer>
            <h1>Edit note</h1>

            <FormControl fullWidth>
            </FormControl>
      
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth>
                <NoteFormField
                  name="value"
                  placeholder="Type Note here"
                  type="text"
                  defaultValue={getNoteQuery.data?.value}
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
                          <Checkbox checked={selectedLabelNames.includes(name as never)} />  
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

export default EditNotePage;
