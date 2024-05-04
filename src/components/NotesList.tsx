
import {
    useQuery,
  } from 'react-query';
  import styled from 'styled-components';
  import { getNotes } from "./../api/notes";
  import NoteCard from './NoteCard'
import { Key, useEffect, useState } from 'react';
import { Note } from '../types';


// export interface props { id?: null | undefined; value?: string }

const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

interface props {
  search?: string
}

function NotesList({ search }: props) {

    const { data, isLoading } = useQuery('notes', async () => {
        return await getNotes()
    })
    const [notes, setNotes] = useState([])
    
    useEffect(() => {
      if (data && !search) {
        console.log('data: ', data)
        setNotes(data)
      }
    })

    useEffect(() => {
      if (search) {
        const filteredNotes = notes.filter((note: Note) => note.value.includes(search))
        console.log('filteredNotes: ', filteredNotes)
        setNotes(filteredNotes)
      }
    },[search])

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