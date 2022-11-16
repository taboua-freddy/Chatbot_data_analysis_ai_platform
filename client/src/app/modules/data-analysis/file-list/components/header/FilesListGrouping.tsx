import {useMutation, useQueryClient} from 'react-query'
import {useListView} from '../../core/ListViewProvider'
import {QUERIES} from "../../../../../../_metronic/helpers";
import {deleteSelectedFiles} from "../../core/_requests";
import {useFileQueryResponse} from "../../core/FileQueryResponseProvider";

const FilesListGrouping = () => {
    const {selected, clearSelected} = useListView()
    const queryClient = useQueryClient()
    const {query} = useFileQueryResponse()

    const deleteSelectedItems = useMutation(() => deleteSelectedFiles(selected), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ✅ update detail view directly
            queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`])
            clearSelected()
        },
    })

    return (
        <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bolder me-5'>
                <span className='me-2'>{selected.length}</span> Selected
            </div>

            <button
                type='button'
                className='btn btn-danger'
                onClick={async () => await deleteSelectedItems.mutateAsync()}
            >
                Delete Selected
            </button>
        </div>
    )
}

export {FilesListGrouping}
