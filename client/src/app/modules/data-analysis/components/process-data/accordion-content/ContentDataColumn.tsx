import React, {FC} from 'react';
import SelectMultiple from "../form-elements/SelectMultiple";
import SelectSingle from "../form-elements/SelectSingle";

type ContentDataColumnProps = {
    options?: string[]
}

const ContentDataColumn: FC<ContentDataColumnProps> = ({options}) => {
    const data = ["Name", "Age", "size"]
    return (
        <div>
            <SelectMultiple fieldName={"xLabel"} data={data} label={"x labels"}/>
            <SelectSingle fieldName={"groupBy"} data={data} label={"GroupBy"}/>
        </div>
    );
};

export default ContentDataColumn;
