import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';
import { deleteNote } from '../../api/notes';
import { Note } from '../../types'

const CardContainer = styled.div`
  margin-bottom: 20px;
`;

function NoteCard({ id, value }: Note) {

  const handleDeleteNote = async () => {
    await deleteNote(id)
    window.location.pathname = '/'
  };

    return (
      <CardContainer>
        <Card
           onClick={() => window.location.pathname = `/notes/${id}`}
        >
          <CardContent>
            {value}
          </CardContent>
          <CardActions style={{ padding: '14px' }} disableSpacing>
            <Grid
              justifyContent="space-between"
              container 
            >
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
