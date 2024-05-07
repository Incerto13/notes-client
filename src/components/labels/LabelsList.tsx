import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
  import styled from 'styled-components';
import { Label } from '../../types';
import { getLabels } from '../../api/labels';
import LabelCard from './LabalCard';


const EmptyTasksPlaceholder = styled.p`
  color: #edf4ff;
  text-align: center;
  font-size: 22px;
`;

interface props {
  search?: string
}

function LabelsList({ search }: props) {

    const { data, isLoading } = useQuery('labels', async () => {
        return await getLabels()
    })
    const [labels, setLabels] = useState([])
    
    useEffect(() => {
      if (data && !search) {
        setLabels(data)
      }
    })

    useEffect(() => {
      if (search) {
        const filteredLabels = data.filter((label: Label) => label.name.includes(search))
        setLabels(filteredLabels)
      }
    },[search])

    if (isLoading || !data) {
      return <div>Loading...</div>
    }

    if (data.length === 0) {
        return <EmptyTasksPlaceholder>No labels available. Create one?</EmptyTasksPlaceholder>
      }
    
    return (
      labels?.map((label: Label) => (
            <LabelCard
                key={label.id}
                id={label.id}
                name={label.name}
            />
        ))
    )
}

export default LabelsList;