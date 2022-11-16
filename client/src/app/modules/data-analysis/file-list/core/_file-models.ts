import {ID, Response} from "../../../../../_metronic/helpers";

export type File = {
    id?: ID
    name?: string
    avatar?: string
    email?: string
    position?: string
    role?: string
    last_login?: string
    two_steps?: boolean
    joined_day?: string
    online?: boolean
    initials?: {
        label: string
        state: string
    }
}

export type FilesProperty = {
    max_size?: string
    max_items?: string
}

export type FileQueryResponse = Response<Array<File>>