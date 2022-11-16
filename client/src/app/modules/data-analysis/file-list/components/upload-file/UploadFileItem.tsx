import React, {FC} from "react";
import {FileError} from "react-dropzone";
import {KTSVG} from "../../../../../../_metronic/helpers";
import {useListView} from "../../core/ListViewProvider";

const UploadFileItem: FC<{ setItemToDelete: React.Dispatch<React.SetStateAction<string>>, id: string, file: File, errors?: FileError[] }> = ({
                                                                                                                                                 setItemToDelete,
                                                                                                                                                 id,
                                                                                                                                                 file,
                                                                                                                                                 errors
                                                                                                                                             }) => {

    const deleteItem = () => {
        setItemToDelete(id)
    }
    const divErrors = errors ? errors.map(e => (
        <div key={e.code} className="dropzone-error mt-0 text-danger" data-dz-errormessage="">{e.message}</div>
    )) : ""

    return (
        <div className="dropzone-item p-5 d-flex justify-content-between">
            <div className="dropzone-file">
                <div className="dropzone-filename text-dark"
                     title={file.name}>
                    <span data-dz-name="">{file.name}</span>
                    <strong>(
                        <span data-dz-size="">{file.size} bytes</span>)
                    </strong>
                </div>
                {divErrors}
            </div>
            <div className="dropzone-progress">
                <div className="progress bg-light-primary">
                    {/*aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"*/}
                    <div className="progress-bar bg-primary" role="progressbar"
                         data-dz-uploadprogress="">

                    </div>
                </div>
            </div>
            <div className="dropzone-toolbar">
                <div data-key={id} className="btn btn-icon btn-sm btn-active-icon-primary"
                     onClick={(e) => deleteItem()}>
                    <KTSVG path="/media/icons/duotune/abstract/abs012.svg"
                           className="svg-icon-muted svg-icon-2hx"/>
                </div>
            </div>
        </div>
    );
}

export {UploadFileItem}