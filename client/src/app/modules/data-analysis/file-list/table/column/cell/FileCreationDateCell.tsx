import {FC} from 'react';

const FileCreationDateCell: FC<{ created_at: string }> = ({created_at}) => {
    return (
        <div className='badge badge-light fw-bolder'>{new Date(created_at).toLocaleString()}</div>
    );
};

export default FileCreationDateCell;
