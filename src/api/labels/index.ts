import apiClient from "../common/http-common";

export const getLabels = async () => {
    const res = await apiClient.get('labels')    
    return res.data
}

export const getLabel = async (id: string) => {
    const res = await apiClient.get(`labels/${id}`)    
    return res.data
}

export const createLabel = async (name: string) => {
    const res = await apiClient.post('labels', { name })    
    return res.data
}

export const updateLabel = async (id: string, name: string) => {
    const res = await apiClient.patch(`labels/${id}`, { name })    
    return res.data
}

export const deleteLabel = async (id: string) => {
    const res = await apiClient.delete(`labels/${id}`)    
    return res.data
}

