import React, {FC} from 'react';
import {useParams} from "react-router-dom";

const ProcessAnalysisPage: FC = () => {
    const {id} = useParams()

    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
};

export default ProcessAnalysisPage;
