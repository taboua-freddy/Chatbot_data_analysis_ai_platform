import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentXAxis: FC = () => {
    const {state, dispatch} = useDataAnalysis()

    function setXLabel(e: any) {
        dispatch({
            type: "add_params",
            params: {xLabelName: String(e.target.value)}
        })
    }

    return (
        <TextField onChange={setXLabel} value={state.dataFields.xLabelName} className="mt-2" size="small"
                   label="x axis label"
                   variant="outlined"/>
    );
};

export default ContentXAxis;
