/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {deleteFile} from "../../../../core/_requests";
import {ID, KTSVG, QUERIES} from "../../../../../../../_metronic/helpers";
import {useListView} from "../../../../core/ListViewProvider";
import {MenuComponent} from "../../../../../../../_metronic/assets/ts/components";
import {useFileQueryResponse} from "../../../../core/FileQueryResponseProvider";
import {MySwal} from "../../../../../../../_metronic/helpers/ToastHelper";
import {Link} from "react-router-dom";

type Props = {
    id: ID
}

const FileActionsCell: FC<Props> = ({id}) => {
    const {clearSelected, setItemIdForUpdate} = useListView()
    const {query} = useFileQueryResponse()
    const queryClient = useQueryClient()

    useEffect(() => {
        MenuComponent.reinitialization()
    }, [])

    const openEditModal = () => {
        setItemIdForUpdate(id)
    }
    const deleteItem = useMutation(() => deleteFile(id), {
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
            text: "You are about to delete a file",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Sure",
        }).then((res) => {
            if (res.isConfirmed) {
                let response = deleteItem.mutateAsync()
                response.then((value) => {
                    MySwal.fire("File deleted !", "", "success")
                }).catch((reason) => {
                    MySwal.fire("SomeThing went wrong", "", "error")
                })
            } else if (res.isDismissed) {
                MySwal.fire("Not thing is changed", "", "info")
            }
        })

    }


    return (
        <>
            <a
                href='#'
                className='btn btn-light btn-active-light-primary btn-sm'
                data-kt-menu-trigger='click'
                data-kt-menu-placement='bottom-end'
            >
                Actions
                <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0'/>
            </a>
            {/* begin::Menu */}
            <div
                className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                data-kt-menu='true'
            >
                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                    <Link className='menu-link px-3 text-success' to={`/data-analysis/process-analysis/${id}`}>
                        Process
                    </Link>
                </div>
                {/* end::Menu item */}

                {/* begin::Menu item */}
                <div className='menu-item px-3'>
                    <a
                        className='menu-link px-3 text-danger'
                        data-kt-users-table-filter='delete_row'
                        onClick={() => deleteFileHandle()}
                    >
                        Delete
                    </a>
                </div>
                {/* end::Menu item */}
            </div>
            {/* end::Menu */}
        </>
    )
}

export {FileActionsCell}
