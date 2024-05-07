// import React, { Component, useState } from 'react';
import { Grid, FormControl, Select, MenuItem, TextField, InputAdornment } from '@material-ui/core';
import { useQuery } from 'react-query';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { getLabels } from '../api/labels';
import { useEffect, useState } from 'react';
import { Label } from '../types';


const FiltersContainer = styled.div`
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  background-color: #c0cde0;
  border-radius: 5px;
  padding: 10px;
`;

interface props {
  search: string
  setSearch: (val: string) => void
  selectedLabelId: string
  setSelectedLabelId: (val: string) => void
}

function NoteFilters({ search, setSearch, selectedLabelId, setSelectedLabelId }: props) {

  const { data, isLoading } = useQuery('labels', async () => {
    return await getLabels()
  })

  const [labels, setLabels] = useState([])
    
  useEffect(() => {
    if (data) {
      console.log('labels: ', data)
      setLabels(data)
    }
  })

  const handleSearchTermChange = (e: any) => {
    setSearch(e.target.value)
    setSelectedLabelId('') // only one filter at a time
  }

  const handleSelectedLabelChange = (e: any) => {
    console.log(e.target.value)
    setSelectedLabelId(e.target.value)
    setSearch('') // only one filter at a time
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

    return (
      <FiltersContainer>
        <Grid
          justifyContent="space-between"
          container
        >
          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <TextField
                  placeholder="Search..."
                  value={search}
                  onChange={handleSearchTermChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </ControlContainer>
          </Grid>

          <Grid item>
            <ControlContainer>
              <FormControl style={{ width: '220px' }}>
                <Select
                  value={selectedLabelId}
                  onChange={handleSelectedLabelChange}
                  displayEmpty
                >
                  <MenuItem value={''}></MenuItem>
                  {labels?.map((label: Label) => {
                      return (
                        <MenuItem key={label.id} value={label.id}>
                          {label.name}
                        </MenuItem>
                      )
                  })}
                </Select>
              </FormControl>
            </ControlContainer>
          </Grid>
        </Grid>
      </FiltersContainer>
    );
}

export default NoteFilters;
