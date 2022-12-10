import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {ProcessFields} from "../../../core/_dataA-models";

type ContentDataColumnProps = {
    data: string[]
    label: string
    defaultValue?: string
    fieldName: keyof ProcessFields
}

const SelectSingle: FC<ContentDataColumnProps> = ({fieldName, label, data, defaultValue}) => {
    const {state, dispatch} = useDataAnalysis()
    return (
        <Autocomplete
            onInputChange={(event, newInputValue) => {
                // @ts-ignore
                state.dataFields[fieldName] = newInputValue
                dispatch({
                    type: "add_params",
                    params: state.dataFields
                })
            }}
            limitTags={2} className="mt-3"
            id="size-small-outlined-multi"
            size="small"
            options={data}
            getOptionLabel={(data) => data}
            value={defaultValue}
            renderInput={(params) => (
                <TextField {...params} label={label}/>
            )}
        />
    );
};

export default SelectSingle;
