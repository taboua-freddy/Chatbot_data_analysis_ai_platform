import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import {KTCard, KTCardBody} from "../../../../_metronic/helpers";
import {Button} from "@mui/material";
import {featureType, getFeatureOptions} from "./utils";
import {DropdownSortable} from "../components/process-data/form-elements/DropdownSortable";
import AccordionBarChart from "../components/process-data/AccordionBarChart";
import {DataAnalysisProvider, useDataAnalysis} from "../core/DataAnalysisProvider";
import DragDropTemplate from "../components/process-data/drag-drop/DragDropTemplate";
import {MyToast} from "../../../../_metronic/helpers/ToastHelper";


const ProcessAnalysisPage: FC = () => {
    const {state, dispatch} = useDataAnalysis()

    const {id} = useParams()
    const options: Array<featureType> = getFeatureOptions()

    const handleForm = () => {
        if (!state.dataFields.feature.code) {
            MyToast.fire({
                icon: 'error',
                title: 'Select a feature'
            })

            return
        }
        dispatch({
            type: "add_plot",
        })

    }

    return (
        <div>
            <div className="row g-5 g-xxl-8">
                <div className="col-xl-3 ">
                    <KTCard style={{
                        position: "fixed",
                        width: "18%"
                    }}>
                        <KTCardBody scroll={true} height={300} className='py-4'>
                            <div className="w-100">
                                <form>
                                    <DropdownSortable fieldName={"feature"} options={options}/>
                                    <AccordionBarChart/>

                                </form>
                            </div>
                        </KTCardBody>
                        <div className="container my-5 d-flex justify-content-center border-top border-dark">
                            {state.dataFields.feature && state.dataFields.feature.code &&
                                <Button className="btn btn-primary btn-sm mt-5" onClick={handleForm}
                                        type={"button"}>Process</Button>}
                        </div>
                    </KTCard>
                </div>

                <div className="col-xl-9">
                    <KTCard>
                        <DragDropTemplate droppableId={"plots"}/>
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
