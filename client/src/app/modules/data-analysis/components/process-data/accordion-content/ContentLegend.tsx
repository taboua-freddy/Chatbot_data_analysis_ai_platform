import React, {FC} from 'react';
import {FormControlLabel, Switch, TextField} from "@mui/material";
import SelectSingle from "../form-elements/SelectSingle";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentLegend: FC = () => {
    const {state, dispatch} = useDataAnalysis()

    function toggleLegend(checked: boolean) {
        state.dataFields.showLegend = checked
        if (!checked) {
            state.dataFields.legendText = undefined
            state.dataFields.legendAlignment = undefined
        }
        dispatch({
            type: "add_params",
            params: state.dataFields
        })
    }

    return (
        <div className="mt-2">
            <FormControlLabel onChange={(event, checked) => {
                toggleLegend(checked)
            }}
                              control={<Switch checked={state.dataFields.showLegend}/>}
                              label="Show Legend"/>
            {
                state.dataFields.showLegend &&
                <>
                    <TextField onChange={(e) => {
                        dispatch({
                            type: "add_params",
                            params: {legendText: String(e.target.value)}
                        })
                    }
                    } value={state.dataFields.legendText} className="mt-2" size="small" label="Legend text"
                               variant="outlined"/>
                    <SelectSingle fieldName={"legendAlignment"} data={["left", "center", "right"]} label={"Alignment"}
                                  defaultValue={state.dataFields.legendAlignment ? state.dataFields.legendAlignment : "left"}/>
                </>
            }
        </div>
    );
};

export default ContentLegend;