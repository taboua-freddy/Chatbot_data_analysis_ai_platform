import {useListView} from '../../core/ListViewProvider'
import {FilesListGrouping} from './FilesListGrouping'
import {FilesListSearchComponent} from './FilesListSearchComponent'
import {FilesListToolbar} from "./FileListToolbar";

const FilesListHeader = () => {
    const {selected} = useListView()
    return (
        <div className='card-header border-0 pt-6'>
            <FilesListSearchComponent/>
            {/* begin::Card toolbar */}
            <div className='card-toolbar'>
                {/* begin::Group actions */}
                {selected.length > 0 ? <FilesListGrouping/> : <FilesListToolbar/>}
                {/* end::Group actions */}
            </div>
            {/* end::Card toolbar */}
        </div>
    )
}

export {FilesListHeader}
