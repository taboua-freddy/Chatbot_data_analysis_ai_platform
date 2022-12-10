import React, {FC} from 'react';
import {FilesProperty, KTSVG} from "../../../../_metronic/helpers";
import {bytesToString} from "../../../../_metronic/helpers/convertor";
import {useFilePropertyQueryResponse} from "../core/FileQueryResponseProvider";

const style = {
    backgroundSize: "auto calc(100% + 10rem)",
    backgroundPositionX: "100%",
    backgroundImage: "url('/media/illustrations/sketchy-1/4.png')"
}

const FileListContentHeader: FC = () => {
    const files_prop = useFilePropertyQueryResponse()
    return (
        <>
            <div className="card card-flush pb-0 bgi-position-y-center bgi-no-repeat mb-10"
                 style={style}>
                <div className="card-header pt-10">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle me-5">
                            <div
                                className="symbol-label bg-transparent text-primary border border-secondary border-dashed">
                                <KTSVG path={"/media/illustrations/sketchy-1/4.png"}/>
                            </div>
                        </div>
                        <div className="d-flex flex-column">
                            <h2 className="mb-1">File Manager</h2>
                            <div className="text-muted fw-bolder">
                                <a href="#">{process.env.REACT_APP_THEME_NAME}</a>
                                <span className="mx-3">|</span>
                                <a href="#">File Manager</a>
                                <span
                                    className="mx-3">|</span>{bytesToString(files_prop.total_size)}
                                <span
                                    className="mx-3">|</span>{files_prop.n_total_items} {files_prop.n_total_items <= 1 ? "item" : "items"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body pb-0">
                    <div className="d-flex overflow-auto h-55px"></div>
                </div>
            </div>
        </>
    );
};

export default FileListContentHeader;
