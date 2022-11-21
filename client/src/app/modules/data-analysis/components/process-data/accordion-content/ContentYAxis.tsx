import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentYAxis: FC = () => {
    const {dataFields, setParamsFieldsPartial} = useDataAnalysis()

    function setYLabel(e: any) {
        setParamsFieldsPartial({...dataFields, yLabelName: String(e.target.value)})
    }

    return (
        <TextField onChange={setYLabel} className="mt-2" size="small" label="y axis label" variant="outlined"/>
    );
};

export default ContentYAxis;