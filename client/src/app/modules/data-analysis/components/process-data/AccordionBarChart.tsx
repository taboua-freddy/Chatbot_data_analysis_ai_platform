import React from 'react';
import {AccordionTemplate} from "./accordion-content/AccordionTemplate";
import ContentDataColumn from "./accordion-content/ContentDataColumn";
import ContentXAxis from "./accordion-content/ContentXAxis";
import ContentYAxis from "./accordion-content/ContentYAxis";
import ContentLegend from "./accordion-content/ContentLegend";
import {useDataAnalysis} from "../../core/DataAnalysisProvider";


const AccordionBarChart = () => {
    const {dataFields, setParamsFieldsPartial} = useDataAnalysis()
    const divs = new Map<string, React.ReactNode>([
        ["Data", <ContentDataColumn/>],
        ["X axis", <ContentXAxis/>],
        ["Y axis", <ContentYAxis/>],
        ["Legend", <ContentLegend/>],
    ])
    return (
        <>
            <AccordionTemplate contents={divs}/>
        </>
    );
};

export default AccordionBarChart;
