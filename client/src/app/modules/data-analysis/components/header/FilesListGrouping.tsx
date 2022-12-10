import {useMutation, useQueryClient} from 'react-query'
import {useListView} from '../../core/ListViewProvider'
import {QUERIES} from "../../../../../_metronic/helpers";
import {deleteSelectedFiles} from "../../core/_requests";
import {useFileQueryResponse} from "../../core/FileQueryResponseProvider";
import {MySwal} from "../../../../../_metronic/helpers/ToastHelper";

const FilesListGrouping = () => {
    const {selected, clearSelected} = useListView()
    const queryClient = useQueryClient()
    const {query} = useFileQueryResponse()

    const deleteSelectedItems = useMutation(() => deleteSelectedFiles(selected), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ✅ update detail view directly
            queryClient.invalidateQueries([`${QUERIES.FILES_LIST}-${query}`])
            clearSelected()
        },
    })

    const deleteFileHandle = () => {
        MySwal.fire({
            icon: "warning",
            text: "You are about to delete the selected files",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sure",
        }).then((res) => {
            if (res.isConfirmed) {
                let response = deleteSelectedItems.mutateAsync()
                response.then((value) => {
                    MySwal.fire("Files deleted !", "", "success")
                }).catch((reason) => {
                    MySwal.fire("SomeThing went wrong", "", "error")
                })
            } else if (res.isDismissed) {
                MySwal.fire("Not thing is changed", "", "info")
            }
        })

    }

    return (
        <div className='d-flex justify-content-end align-items-center'>
            <div className='fw-bolder me-5'>
                <span className='me-2'>{selected.length}</span> Selected
            </div>

            <button
                type='button'
                className='btn btn-danger'
                onClick={deleteFileHandle}
            >
                Delete Selected
            </button>
        </div>
    )
}

export {FilesListGrouping}
