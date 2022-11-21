import React, {FC} from 'react';
import Plot from "react-plotly.js";
import {KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import {ProcessFields} from "../../../core/_dataA-models";
import {MySwal} from "../../../../../../_metronic/helpers/ToastHelper";

type PlotContentProps = {
    index: number
    data: ProcessFields
}

const PlotContent: FC<PlotContentProps> = ({index, data}) => {
    function deletePlot() {
        MySwal.fire({
            icon: "warning",
            text: `You are about to delete ${data.feature} .`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes continue"
        }).then((result) => {
            if (result.isConfirmed) {

                MySwal.fire("Plot deleted !", "", "success")
            } else if (result.isDismissed) {
                MySwal.fire('Changes are not applied', '', 'info')
            }
        })
    }

    return (
        <KTCardBody className='border border-primary rounded mb-2'>
            <div className="d-flex justify-content-between border-bottom border-dark">
                <h2 className="fw-bolder">{data.feature}</h2>
                <div onClick={deletePlot} className="btn btn-icon btn-sm btn-active-icon-primary">
                    <KTSVG path="/media/icons/duotune/abstract/abs012.svg"
                           className="svg-icon-muted svg-icon-2hx"/>
                </div>
            </div>
            <Plot
                data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                    {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                ]}
                layout={
                    {
                        "xaxis.title": data.xLabelName,
                        title: {
                            text: data.showLegend ? data.legendText : "",
                            xanchor: data.legendAlignment
                        }
                    }
                }
            />
        </KTCardBody>
    );
};

export default PlotContent;
