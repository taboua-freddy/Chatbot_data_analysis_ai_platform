import {FC} from 'react';

const FileExtCell: FC<{ extension?: string }> = ({extension}) => {
    return (
        <div className='badge badge-light fw-bolder'>{extension}</div>
    );
};

export default FileExtCell;
