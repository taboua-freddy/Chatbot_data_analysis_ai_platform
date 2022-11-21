import React, {FC} from 'react';
import {FormControlLabel, Switch, TextField} from "@mui/material";
import SelectSingle from "../form-elements/SelectSingle";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

const ContentXAxis: FC = () => {
    const {dataFields, setParamsFieldsPartial} = useDataAnalysis()

    function toggleLegend(checked: boolean) {
        dataFields.showLegend = checked
        if (!checked) {
            dataFields.legendText = undefined
            dataFields.legendAlignment = undefined
        }
        setParamsFieldsPartial(dataFields)
    }

    return (
        <div className="mt-2">
            <FormControlLabel onChange={(event, checked) => toggleLegend(checked)}
                              control={<Switch checked={dataFields.showLegend}/>}
                              label="Show Legend"/>
            {
                dataFields.showLegend &&
                <>
                    <TextField onChange={(e) => {
                        setParamsFieldsPartial({...dataFields, legendText: String(e.target.value)})
                    }
                    } className="mt-2" size="small" label="Legend text" variant="outlined"/>
                    <SelectSingle fieldName={"legendAlignment"} data={["left", "center", "right"]} label={"Alignment"}
                                  defaultValue={"left"}/>
                </>
            }
        </div>
    );
};

export default ContentXAxis;