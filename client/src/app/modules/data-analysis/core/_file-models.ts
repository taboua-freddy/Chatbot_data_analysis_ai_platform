import {ID, Response} from "../../../../_metronic/helpers";

export type File = {
    id?: ID
    owner: number
    file_name: string
    size: number
    extension: string
    created_at: Date
    file_url: string
    initials?: {
        label: string
        state: string
    }
}

export type FileQueryResponse = Response<Array<File>>