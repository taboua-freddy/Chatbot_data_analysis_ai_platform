import React, {FC} from 'react';
import {TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentYAxis: FC = () => {
    const {state, dispatch} = useDataAnalysis()

    function setYLabel(e: any) {
        dispatch({
            type: "add_params",
            params: {yLabelName: String(e.target.value)}
        })
    }

    return (
        <TextField onChange={setYLabel} value={state.dataFields.yLabelName} className="mt-2" size="small"
                   label="y axis label" variant="outlined"/>
    );
};

export default ContentYAxis;