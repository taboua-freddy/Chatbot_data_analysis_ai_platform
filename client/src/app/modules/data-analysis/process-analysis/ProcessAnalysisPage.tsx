import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {Button} from "@mui/material";
import {featureType, getFeatureOptions} from "./utils";
import {DropdownSortable} from "../components/process-data/form-elements/DropdownSortable";
import AccordionBarChart from "../components/process-data/AccordionBarChart";
import {DataAnalysisProvider, useDataAnalysis} from "../core/DataAnalysisProvider";
import DragDropTemplate from "../components/process-data/drag-drop/DragDropTemplate";


const ProcessAnalysisPage: FC = () => {
    const [plotDiv, setPlotDiv] = useState(<DragDropTemplate droppableId={"plots"}/>);
    const {listDataFields, updateListDataFields} = useDataAnalysis()
    const {id} = useParams()
    const options: Array<featureType> = getFeatureOptions()

    const handleForm = () => {
        updateListDataFields(true)
        setPlotDiv(<DragDropTemplate droppableId={"plots"}/>)
    }

    useEffect(() => {
        console.log("update")
    }, [updateListDataFields]);


    return (
        <div>
            <div className="row g-5 g-xxl-8">
                <div className="col-xl-3">
                    <KTCard>
                        <KTCardBody scroll={true} className='py-4'>
                            <div className="w-100">
                                <form>
                                    <DropdownSortable fieldName={"feature"} options={options}/>
                                    <AccordionBarChart/>
                                    <div className="container mt-5">
                                        <Button className="btn btn-primary btn-sm" onClick={handleForm}
                                                type={"button"}>Process</Button>
                                    </div>
                                </form>
                            </div>
                        </KTCardBody>
                    </KTCard>
                </div>

                <div className="col-xl-9">
                    <KTCard>
                        {plotDiv}
                    </KTCard>
                </div>
            </div>
        </div>
    );
};

const ProcessAnalysisWrapper: FC = () => {
    return (
        <DataAnalysisProvider>
            <ProcessAnalysisPage/>
        </DataAnalysisProvider>
    )
}

export {ProcessAnalysisWrapper};
