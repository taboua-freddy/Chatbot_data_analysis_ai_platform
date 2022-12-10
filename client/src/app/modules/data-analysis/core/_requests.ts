import axios, {AxiosResponse} from 'axios'
import {File as _File, FileQueryResponse} from "./_file-models";
import {ID, Response} from "../../../../_metronic/helpers";

const API_URL1 = "http://localhost:8000"
const API_URL = process.env.REACT_APP_THEME_API_URL
const USER_URL = `${API_URL}/user`
const GET_FILES_URL = `${API_URL1}/account/files/`
const UPLOAD_FILES = `${API_URL1}/account/files/`
const FILES_URL = `${API_URL1}/account/files/`

const getFiles = (query: string): Promise<FileQueryResponse> => {
    return axios
        .get(`${FILES_URL}?${query}`)
        .then((d: AxiosResponse<FileQueryResponse>) => d.data)
}

const uploadFiles = (files: File[]): Promise<FileQueryResponse> => {
    let formData = new FormData()
    files.forEach(f => formData.append(f.name, f as Blob))

    return axios
        .put(FILES_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((d: AxiosResponse<FileQueryResponse>) => d.data)
}

const getFileById = (id: ID): Promise<_File | undefined> => {
    return axios
        .get(`${USER_URL}/${id}/`)
        .then((response: AxiosResponse<Response<_File>>) => response.data)
        .then((response: Response<_File>) => response.data)
}

const deleteFile = (fileId: ID): Promise<void> => {
    return axios.delete(`${FILES_URL}${fileId}/`).then(() => {
    })
}

const deleteSelectedFiles = (fileIds: Array<ID>): Promise<void> => {
    const requests = fileIds.map((id) => axios.delete(`${FILES_URL}${id}/`))
    return axios.all(requests).then(() => {
    })
}

export {getFiles, deleteFile, deleteSelectedFiles, getFileById, uploadFiles}
