import {KTSVG} from "../../../../../_metronic/helpers";

const FilesListToolbar = () => {

    return (
        <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>


            {/* begin::Export */}
            <button type='button' className='btn btn-light-primary me-3'>
                <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2'/>
                Export
            </button>
            {/* end::Export */}

            {/* begin::Add file */}
            <button type='button' data-bs-toggle="modal" data-bs-target="#kt_modal_upload" className='btn btn-primary'>
                <KTSVG path='/media/icons/duotune/files/fil010.svg' className='svg-icon-2'/>
                Upload Files
            </button>
            {/* end::Add file */}

        </div>
    )
}

export {FilesListToolbar}
