import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import {File} from "../../core/_file-models";

type Props = {
    column: ColumnInstance<File>
}

const CustomHeaderColumn: FC<Props> = ({column}) => (
    <>
        {column.Header && typeof column.Header === 'string' ? (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ) : (
            column.render('Header')
        )}
    </>
)

export {CustomHeaderColumn}
