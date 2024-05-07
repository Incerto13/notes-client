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
import { Label, Note } from '../types'
import { deleteLabel } from '../api/labels';

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

function LabelCard({ id, name }: Label) {

  const handleDeleteLabel = async () => {
    await deleteLabel(id)
    window.location.pathname = '/labels'
  };

    return (
      <CardContainer>
        <Card
           onClick={() => window.location.pathname = `/labels/${id}`}
        >
          <CardContent>
            {name}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justifyContent="space-between"
              container 
            >
              <Grid item>
                <IconButton onClick={handleDeleteLabel}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </CardContainer>
    );
}

export default LabelCard;
