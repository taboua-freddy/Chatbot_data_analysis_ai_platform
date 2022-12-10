import React, {FC} from 'react';
import {File} from "../../../../core/_file-models";
import {toAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import clsx from "clsx";
import {bytesToString} from "../../../../../../../_metronic/helpers/convertor";


const FileInfoCell: FC<{ file: File }> = ({file}) => {
    return (
        <div className='d-flex align-items-center'>
            {/* begin:: Avatar */}
            <div className='symbol symbol-square symbol-50px overflow-hidden me-3'>
                <a href='#'>
                    <div className='symbol-label'>
                        <img src={toAbsoluteUrl("/media/icons/duotune/files/fil003.svg")} alt={file.file_name}
                             className='w-100'/>
                    </div>
                </a>
            </div>
            <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                    {file.file_name}
                </a>
                <span>{bytesToString(file.size)}</span>
            </div>
        </div>
    );
};

export default FileInfoCell;
