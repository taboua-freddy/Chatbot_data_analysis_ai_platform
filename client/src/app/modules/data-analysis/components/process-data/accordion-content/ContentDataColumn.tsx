import React, {FC} from 'react';
import SelectMultiple from "../form-elements/SelectMultiple";
import SelectSingle from "../form-elements/SelectSingle";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";

type ContentDataColumnProps = {
    options?: string[]
}

const ContentDataColumn: FC<ContentDataColumnProps> = ({options}) => {
    const data = ["Name", "Age", "size"]
    const {state} = useDataAnalysis()
    return (
        <div>
            <SelectMultiple defaultValue={state.dataFields.xLabel} fieldName={"xLabel"} data={data} label={"x labels"}/>
            <SelectSingle defaultValue={state.dataFields.groupBy} fieldName={"groupBy"} data={data} label={"GroupBy"}/>
        </div>
    );
};

export default ContentDataColumn;
