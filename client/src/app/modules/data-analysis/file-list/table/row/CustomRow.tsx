import clsx from 'clsx'
import {FC} from 'react'
import {Cell, Row} from 'react-table'
import {File} from "../../core/_file-models";

type Props = {
    row: Row<File>
}

const CustomRow: FC<Props> = ({row}) => (
    <tr {...row.getRowProps()}>
        {row.cells.map((cell: Cell<File>) => {
            return (
                <td
                    {...cell.getCellProps()}
                    className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
                >
                    {cell.render('Cell')}
                </td>
            )
        })}
    </tr>
)

export {CustomRow}
