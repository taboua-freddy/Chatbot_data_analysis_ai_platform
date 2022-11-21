import React, {FC} from 'react';
import {Autocomplete, TextField} from "@mui/material";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {ProcessFields} from "../../../core/_dataA-models";

type ContentDataColumnProps = {
    data: string[]
    label: string
    fieldName: keyof ProcessFields
}

const SelectMultiple: FC<ContentDataColumnProps> = ({label, data, fieldName}) => {
    const {dataFields, setParamsFieldsPartial} = useDataAnalysis()
    console.log("rend")
    return (
        <Autocomplete className="mt-3"
                      onChange={(event, newInputValue) => {
                          console.log(newInputValue)
                          // @ts-ignore
                          dataFields[fieldName] = newInputValue
                          setParamsFieldsPartial(dataFields)

                      }}
                      multiple
                      limitTags={1}
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
