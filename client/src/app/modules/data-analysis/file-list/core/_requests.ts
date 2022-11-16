import axios, {AxiosResponse} from 'axios'
import {File, FileQueryResponse} from "./_file-models";
import {ID, Response} from "../../../../../_metronic/helpers";

const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_USERS_URL = `${API_URL}/users/query`

const getFiles = (query: string): Promise<FileQueryResponse> => {
    return axios
        .get(`${GET_USERS_URL}?${query}`)
        .then((d: AxiosResponse<FileQueryResponse>) => d.data)
}

const getFileById = (id: ID): Promise<File | undefined> => {
    return axios
        .get(`${USER_URL}/${id}`)
        .then((response: AxiosResponse<Response<File>>) => response.data)
        .then((response: Response<File>) => response.data)
}

const createFile = (file: File): Promise<File | undefined> => {
    return axios
        .put(USER_URL, file)
        .then((response: AxiosResponse<Response<File>>) => response.data)
        .then((response: Response<File>) => response.data)
}

const updateFile = (file: File): Promise<File | undefined> => {
    return axios
        .post(`${USER_URL}/${file.id}`, file)
        .then((response: AxiosResponse<Response<File>>) => response.data)
        .then((response: Response<File>) => response.data)
}

const deleteFile = (fileId: ID): Promise<void> => {
    return axios.delete(`${USER_URL}/${fileId}`).then(() => {
    })
}

const deleteSelectedFiles = (fileIds: Array<ID>): Promise<void> => {
    const requests = fileIds.map((id) => axios.delete(`${USER_URL}/${id}`))
    return axios.all(requests).then(() => {
    })
}

export {getFiles, deleteFile, deleteSelectedFiles, getFileById, createFile, updateFile}
