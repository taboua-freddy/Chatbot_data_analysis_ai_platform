import {useMemo} from 'react'
import {ColumnInstance, Row, useTable} from 'react-table'
import {CustomHeaderColumn} from "./header/CustomHeaderColumn";
import {File} from "../core/_file-models";
import {CustomRow} from "./row/CustomRow";
import {filesColumns} from "./column/_fileColumns";
import {FilesListPagination} from "../components/pagination/FilesListPagination";
import {FilesListLoading} from "../components/loading/FilesListLoading";
import {KTCardBody} from "../../../../../_metronic/helpers";
import {useFileQueryResponseData, useFileQueryResponseLoading} from "../core/FileQueryResponseProvider";

const FilesTable = () => {
    const files = useFileQueryResponseData()
    const isLoading = useFileQueryResponseLoading()
    const data = useMemo(() => files, [files])
    const columns = useMemo(() => filesColumns, [])
    const {getTableProps, getTableBodyProps, headers, rows, prepareRow} = useTable({
        columns,
        data,
    })

    return (
        <KTCardBody className='py-4'>
            <div className='table-responsive'>
                <table
                    id='kt_table_users'
                    className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column: ColumnInstance<File>) => (
                            <CustomHeaderColumn key={column.id} column={column}/>
                        ))}
                    </tr>
                    </thead>
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                    {rows.length > 0 ? (
                        rows.map((row: Row<File>, i: number) => {
                            prepareRow(row)
                            return <CustomRow row={row} key={`row-${i}-${row.id}`}/>
                        })
                    ) : (
                        <tr>
                            <td colSpan={7}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                    No matching records found
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <FilesListPagination/>
            {isLoading && <FilesListLoading/>}
        </KTCardBody>
    )
}

export {FilesTable}
