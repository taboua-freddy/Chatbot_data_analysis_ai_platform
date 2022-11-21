import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentXAxis: FC = () => {
    const {dataFields, setParamsFieldsPartial} = useDataAnalysis()

    function setXLabel(e: any) {
        setParamsFieldsPartial({...dataFields, xLabelName: String(e.target.value)})
    }

    return (
        <TextField onChange={setXLabel} className="mt-2" size="small" label="x axis label"
                   variant="outlined"/>
    );
};

export default ContentXAxis;
