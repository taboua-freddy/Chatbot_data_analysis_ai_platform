import React, {useEffect, useState} from 'react';
import {useListView} from "../core/ListViewProvider";
import {initialListView, KTSVG} from "../../../../../_metronic/helpers";
import {UploadFileItem} from "../components/upload-file/UploadFileItem";
import {FileError, FileRejection, useDropzone} from "react-dropzone";
import {maxFileSize, validateFile} from "./file-validator";
import {MySwal} from "../../../../../_metronic/helpers/ToastHelper";
import Swal from "sweetalert2";


const UploadFileModal = () => {
    const [isFileAllRemoved, setIsFileAllRemoved] = useState(false);
    const [attachedFileState, setAttachedFileState] = useState<{ isAcceptedFiles: boolean, isRejectedFiles: boolean }>({
        isAcceptedFiles: false,
        isRejectedFiles: false
    });
    const [fileItems, setFileItems] = useState<JSX.Element[]>([]);
    const {filesToUpload, setFilesToUpload} = useListView()
    const [itemToDelete, setItemToDelete] = useState<string>("");

    const {acceptedFiles, fileRejections, getRootProps, getInputProps} = useDropzone({
        validator: validateFile
    });

    const getAttachedFileStateVal = (init: boolean = false) => {
        if (filesToUpload && !init)
            return {
                isAcceptedFiles: (Array.from(filesToUpload?.values()).filter((value) => value.errors.length === 0)).length > 0,
                isRejectedFiles: (Array.from(filesToUpload?.values()).filter((value) => value.errors.length > 0)).length > 0
            }
        return {
            isAcceptedFiles: false,
            isRejectedFiles: false
        }
    }

    const deleteAllItems = () => {
        MySwal.fire({
            icon: "question",
            text: "You are about to remove all the attached files.",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes continue"
        }).then((result) => {
            if (result.isConfirmed) {
                if (setFilesToUpload) {
                    setFilesToUpload(new Map<string, { file: File; errors: FileError[] }>())
                    setFileItems([])
                    setIsFileAllRemoved(true)
                    setAttachedFileState(getAttachedFileStateVal(true))
                }
                MySwal.fire("Files deleted !", "", "success")
            } else if (result.isDismissed) {
                MySwal.fire('Changes are not applied', '', 'info')
            }
        })
    }

    const deleteItem = (itemToDelete: string) => {
        if (setFilesToUpload && filesToUpload?.delete(itemToDelete)) {
            setFileItems(fileItems.filter((value) => value.key !== itemToDelete))
            setFilesToUpload(filesToUpload)
            setAttachedFileState(getAttachedFileStateVal())
        }

    }
    useEffect(() => {
        console.log(filesToUpload)
        if (setFilesToUpload && filesToUpload && !isFileAllRemoved) {
            acceptedFiles.forEach((file) => {
                filesToUpload.set(file.name, {file: file, errors: []})
            })
            fileRejections.forEach(({file, errors}) => {
                filesToUpload.set(file.name, {file: file, errors: errors})
            })
            setFilesToUpload(filesToUpload)
            setFileItems(Array.from(filesToUpload.values()).map((value) =>
                <UploadFileItem setItemToDelete={setItemToDelete}
                                key={value.file.name} id={value.file.name}
                                file={value.file}
                                errors={value.errors}/>))
            setIsFileAllRemoved(false)
            setAttachedFileState(getAttachedFileStateVal())
        }

        setIsFileAllRemoved(false)
    }, [acceptedFiles, fileRejections]);

    useEffect(() => {
        deleteItem(itemToDelete)
    }, [itemToDelete]);


    return (
        <div>
            <div className="modal fade " id="kt_modal_upload" tabIndex={-1}
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered mw-650px">
                    <div className="modal-content">
                        <form className="form" action="none">
                            <div className="modal-header">
                                <h2 className="fw-bolder">Upload files</h2>
                                <div className="btn btn-icon btn-sm btn-active-icon-primary" data-bs-dismiss="modal">
                                    <KTSVG path="/media/icons/duotune/abstract/abs012.svg"
                                           className="svg-icon-muted svg-icon-2hx"/>
                                </div>
                            </div>
                            <div className="modal-body pt-10 pb-15 px-lg-17">
                                <div className="form-group">
                                    <div className="dropzone dropzone-queue mb-2" id="kt_modal_upload_dropzone">
                                        <div className="dropzone-panel mb-4">

                                            <a className="dropzone-select btn btn-sm btn-primary me-2">
                                                <div {...getRootProps({className: 'dropzone'})}>
                                                    <input {...getInputProps()} />
                                                    <p className={"mb-0"}>Attach files</p>
                                                </div>
                                            </a>
                                            {
                                                attachedFileState.isAcceptedFiles && !attachedFileState.isRejectedFiles &&
                                                <a
                                                    className="dropzone-upload btn btn-sm btn-light-primary me-2">Upload
                                                    All</a>
                                            }
                                            {
                                                (attachedFileState.isAcceptedFiles || attachedFileState.isRejectedFiles) &&
                                                <a className="dropzone-remove-all btn btn-sm btn-light-primary"
                                                   onClick={() => deleteAllItems()}>Remove
                                                    All</a>
                                            }
                                        </div>

                                        {/* item to upload */}
                                        <div className="dropzone-items wm-200px">
                                            {
                                                fileItems
                                            }
                                        </div>
                                    </div>
                                    <span className="form-text fs-6 text-muted">Max file size is {maxFileSize} bytes per file.</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadFileModal;
