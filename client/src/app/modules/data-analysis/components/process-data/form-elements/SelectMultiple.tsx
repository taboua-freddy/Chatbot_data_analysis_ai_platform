import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {ProcessFields} from "../../../core/_dataA-models";

type ContentDataColumnProps = {
    data: string[]
    label: string
    fieldName: keyof ProcessFields
    defaultValue?: any[]
}

const SelectMultiple: FC<ContentDataColumnProps> = ({defaultValue, label, data, fieldName}) => {
    const {state, dispatch} = useDataAnalysis()

    return (
        <Autocomplete className="mt-3"
                      onChange={(event, newInputValue) => {
                          // @ts-ignore
                          state.dataFields[fieldName] = newInputValue
                          dispatch({
                              type: "add_params",
                              params: state.dataFields
                          })

                      }}
                      value={defaultValue ? defaultValue : []}
                      multiple
                      limitTags={2}
                      size="small"
                      options={data}
                      getOptionLabel={(data) => data}
                      renderInput={(params) => (
                          <TextField {...params} label={label}/>
                      )}
        />
    );
};

export default SelectMultiple;
