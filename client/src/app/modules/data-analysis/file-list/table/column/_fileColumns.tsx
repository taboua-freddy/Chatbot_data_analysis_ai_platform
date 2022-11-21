import {Column} from 'react-table'
import {File} from "../../../core/_file-models";
import {FileSelectionHeader} from "../header/FileSelectionHeader";
import {FileHeader} from "../header/FileHeader";
import FileInfoCell from "./cell/FileInfoCell";
import FileExtCell from "./cell/FileExtCell";
import {FileActionsCell} from "./cell/FileActioncell";
import {FileSelectionCell} from "./cell/FileSelectionCell";

const filesColumns: ReadonlyArray<Column<File>> = [
    {
        Header: (props: any) => <FileSelectionHeader tableProps={props}/>,
        id: 'selection',
        Cell: ({...props}) => <FileSelectionCell id={props.data[props.row.index].id}/>,
    },
    {
        Header: (props: any) => <FileHeader tableProps={props} title='Name' className='min-w-125px'/>,
        id: 'file_name',
        Cell: ({...props}) => <FileInfoCell file={props.data[props.row.index]}/>,
    },
    {
        Header: (props: any) => (
            <FileHeader tableProps={props} title='Extension' className='min-w-125px'/>
        ),
        id: 'extension',
        Cell: ({...props}) => <FileExtCell extension={props.data[props.row.index].last_login}/>,
    },
    {
        Header: (props: any) => (
            <FileHeader tableProps={props} title='Actions' className='text-end min-w-100px'/>
        ),
        id: 'actions',
        Cell: ({...props}) => <FileActionsCell id={props.data[props.row.index].id}/>,
    },
]

export {filesColumns}
