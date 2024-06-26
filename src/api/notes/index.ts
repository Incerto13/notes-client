import apiClient from "../common/http-common";

export const getNotes = async () => {
    const res = await apiClient.get('notes')    
    return res?.data ?? []
}

export const getNote = async (id: string) => {
    const res = await apiClient.get(`notes/${id}`)    
    return res?.data
}

export const createNote = async (value: string, labelIds: string[]) => {
    const res = await apiClient.post('notes', { value, labelIds })    
    return res.data
}

export const updateNote = async (id: string, value: string, labelIds: string[]) => {
    const res = await apiClient.patch(`notes/${id}`, { value, labelIds })    
    return res.data
}

export const deleteNote = async (id: string) => {
    const res = await apiClient.delete(`notes/${id}`)    
    return res.data
}

