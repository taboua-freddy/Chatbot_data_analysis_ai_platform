import React, {useEffect, useState} from 'react';
import {useListView} from "../../core/ListViewProvider";
import {KTSVG, QUERIES} from "../../../../../_metronic/helpers";
import {UploadFileItem} from "../../components/upload-file/UploadFileItem";
import {FileError, useDropzone} from "react-dropzone";
import {maxFileSize, validateFile} from "./file-validator";
import {MySwal, MyToast} from "../../../../../_metronic/helpers/ToastHelper";
import {bytesToString} from "../../../../../_metronic/helpers/convertor";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {deleteSelectedFiles, getFiles, uploadFiles} from "../../core/_requests";
import {FileQueryResponse} from "../../core/_file-models";
import {useFileQueryResponse} from "../../core/FileQueryResponseProvider";


const UploadFileModal = () => {
    const {clearSelected} = useListView()
    const {query} = useFileQueryResponse()
    const queryClient = useQueryClient()
    const [isFileAllRemoved, setIsFileAllRemoved] = useState(false);
    const [attachedFileState, setAttachedFileState] = useState<{ isAcceptedFiles: boolean, isRejectedFiles: boolean }>({
        isAcceptedFiles: false,
        isRejectedFiles: false
    });
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
            icon: "warning",
            text: "You are about to remove all the attached files.",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes continue"
        }).then((result) => {
            if (result.isConfirmed) {
                if (setFilesToUpload) {
                    setFilesToUpload(new Map<string, { file: File; errors: FileError[] }>())
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
            setFilesToUpload(filesToUpload)
            setAttachedFileState(getAttachedFileStateVal())
        }

    }
    useEffect(() => {
        if (setFilesToUpload && filesToUpload && !isFileAllRemoved) {
            acceptedFiles.forEach((file) => {
                filesToUpload.set(file.name, {file: file, errors: []})
            })
            fileRejections.forEach(({file, errors}) => {
                filesToUpload.set(file.name, {file: file, errors: errors})
            })
            setFilesToUpload(filesToUpload)
            setIsFileAllRemoved(false)
            setAttachedFileState(getAttachedFileStateVal())
        }

        setIsFileAllRemoved(false)
    }, [acceptedFiles, fileRejections]);

    useEffect(() => {
        deleteItem(itemToDelete)
    }, [itemToDelete]);

    const upload = useMutation(() => {
        const files = filesToUpload ? Array.from(filesToUpload.values()).map(value => value.file) : []
        return uploadFiles(files)
    }, {
        // ???? response of the mutation is passed to onSuccess
        onSuccess: () => {
            // ??? update detail view directly
            queryClient.invalidateQueries([`${QUERIES.FILES_LIST}-${query}`])
            if (setFilesToUpload) {
                setFilesToUpload(new Map<string, { file: File; errors: FileError[] }>())
            }
            setIsFileAllRemoved(true)
            setAttachedFileState(getAttachedFileStateVal(true))
        },
    })


    function handleUpload() {
        MySwal.fire({
            icon: "question",
            text: "Do you really want to upload these files?",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes upload"
        }).then((result) => {
            if (result.isConfirmed) {
                const fileForm = filesToUpload ? Array.from(filesToUpload.values()).map(value => value.file) : []

                const newFiles = uploadFiles(fileForm)
                    .then((resp: FileQueryResponse) => {
                        MySwal.fire("Files uploaded !", "", "success")
                        //clearSelected()
                        return resp.data
                    })
                    .catch((reason) => {
                        MyToast.fire({
                            icon: "error",
                            titleText: "Something went wrong with the server!"
                        })
                    })
                    .finally(() => {
                        //stop loading
                    })

                if (setFilesToUpload) {
                    setFilesToUpload(new Map<string, { file: File; errors: FileError[] }>())
                    setIsFileAllRemoved(true)
                    setAttachedFileState(getAttachedFileStateVal(true))
                }

            }
        })
    }

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
                                                <a onClick={handleUpload}
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
                                                Array.from(filesToUpload!.values()).map((value) =>
                                                    <UploadFileItem setItemToDelete={setItemToDelete}
                                                                    key={value.file.name} id={value.file.name}
                                                                    file={value.file}
                                                                    errors={value.errors}/>)
                                            }
                                        </div>
                                    </div>
                                    <span
                                        className="form-text fs-6 text-danger">Max file size is <strong>{bytesToString(maxFileSize)}</strong> per file.</span>
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
