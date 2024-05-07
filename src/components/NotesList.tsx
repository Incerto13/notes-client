import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
  import styled from 'styled-components';
  import { getNotes } from "./../api/notes";
  import NoteCard from './NoteCard'
import { Note, NoteLabel } from '../types';


const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

interface props {
  search?: string
  selectedLabelId?: string
}

function NotesList({ search, selectedLabelId }: props) {

    const { data, isLoading } = useQuery('notes', async () => {
        return await getNotes()
    })
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
      if (data && !search && !selectedLabelId) {
        setNotes(data)
      }
    })

    useEffect(() => {
      if (search) {
        const filteredNotes = data.filter((note: Note) => note.value.includes(search))
        console.log('filteredNotes: ', filteredNotes)
        setNotes(filteredNotes)
      }
    },[search])

    useEffect(() => {
      if (selectedLabelId) {
        console.log('selectedLabelId: ', selectedLabelId)
        const filteredNotes = data.filter((note: Note) => note.labels?.map((noteLabel: NoteLabel) => noteLabel.labelId).includes(selectedLabelId))   // .includes(selectedLabelId) // ?.map((noteLabel: NoteLabel) => noteLabel.labelId))// .includes(selectedLabelId)
        console.log('data: ', data)
        console.log('filteredNotes: ', filteredNotes)
        if (filteredNotes) {
          setNotes(filteredNotes)
        }
      }
    },[selectedLabelId])

    if (isLoading || !data) {
      return <div>Loading...</div>
    }

    if (data.length === 0) {
        return <EmptyTasksPlaceholder>No notes available. Create one?</EmptyTasksPlaceholder>
      }
    
    return (
        notes?.map((note: Note) => (
            <NoteCard
                key={note.id}
                id={note.id}
                value={note.value}
            />
        ))
    )
}

export default NotesList;