import React, { Component, useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { deleteNote, updateNote } from '../api/notes';
import { Note } from '../types'

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

// const CardTitle = styled.h1`
//   margin: 8px 0;
//   font-size: 22px;
// `;

function NoteCard({ id, value }: Note) {
  // const [updatedValue, setUpdatedValue] = useState(value)

  // const handleUpdateNote = async () => {
  //   await updateNote(id, updatedValue)
  // };

  const handleDeleteNote = async () => {
    await deleteNote(id)
    window.location.pathname = '/'
  };

  const handleStatusChange = e => {
    // this.props.tasksStore.updateTaskStatus(this.props.id, e.target.value);
  };

    return (
      <CardContainer>
        <Card>
          <CardContent>
            {value}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justify="space-between" // Add it here :)
              container 
            >
              <Grid item>
                <FormControl style={{ width: '140px' }}>
                  {/* <Select
                    value={this.props.status}
                    onChange={this.handleStatusChange}
                    displayEmpty
                  >
                    <MenuItem value={'OPEN'}>Open</MenuItem>
                    <MenuItem value={'IN_PROGRESS'}>In Progress</MenuItem>
                    <MenuItem value={'DONE'}>Done</MenuItem>
                  </Select> */}
                </FormControl>
              </Grid>

              <Grid item>
                <IconButton onClick={handleDeleteNote}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
}

export default NoteCard;
