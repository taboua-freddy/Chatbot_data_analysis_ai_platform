import React, {FC} from 'react';
import {File} from "../../../../core/_file-models";
import {toAbsoluteUrl} from "../../../../../../../_metronic/helpers";
import clsx from "clsx";


const FileInfoCell: FC<{ file: File }> = ({file}) => {
    return (
        <div className='d-flex align-items-center'>
            {/* begin:: Avatar */}
            <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                <a href='#'>
                    {file.avatar ? (
                        <div className='symbol-label'>
                            <img src={toAbsoluteUrl(`/media/${file.avatar}`)} alt={file.name} className='w-100'/>
                        </div>
                    ) : (
                        <div
                            className={clsx(
                                'symbol-label fs-3',
                                `bg-light-${file.initials?.state}`,
                                `text-${file.initials?.state}`
                            )}
                        >
                            {file.initials?.label}
                        </div>
                    )}
                </a>
            </div>
            <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                    {file.name}
                </a>
                <span>{file.email}</span>
            </div>
        </div>
    );
};

export default FileInfoCell;
