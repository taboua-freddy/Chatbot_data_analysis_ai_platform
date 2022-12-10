import React, {FC, useEffect, useState} from 'react';
import Plot from "react-plotly.js";
import {KTCardBody, KTSVG} from "../../../../../../_metronic/helpers";
import {BarDataFields, LegendFields, ProcessFields, XFields, YFields} from "../../../core/_dataA-models";
import {MySwal, MyToast} from "../../../../../../_metronic/helpers/ToastHelper";
import {useDataAnalysis} from "../../../core/DataAnalysisProvider";
import {Data, Layout} from "plotly.js";

type PlotContentProps = {
    index: number
    data: ProcessFields
}

function getTableData() {
    const values = [
        ['Salaries', 'Office', 'Merchandise', 'Legal', '<b>TOTAL</b>'],
        [1200000, 20000, 80000, 2000, 12120000],
        [1300000, 20000, 70000, 2000, 130902000],
        [1300000, 20000, 120000, 2000, 131222000],
        [1400000, 20000, 90000, 2000, 14102000]]
    const data: any[] = [{
        type: 'table',
        header: {
            values: [["<b>EXPENSES</b>"], ["<b>Q1</b>"],
                ["<b>Q2</b>"], ["<b>Q3</b>"], ["<b>Q4</b>"]],
            align: "center",
            line: {width: 1, color: '#506784'},
            fill: {color: "#119DFF"},
            font: {family: "Arial", size: 12, color: "white"}
        },
        cells: {
            values: values,
            align: "center",
            line: {color: "black", width: 1},
            font: {family: "Arial", size: 11, color: ["black"]}
        }
    }]
    return data
}

function getBarData(inputs: Partial<BarDataFields>) {
    const data: Data[] = []
    inputs.xLabel?.forEach((xLabel) => {
        data.push({
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "bar",
            mode: 'lines+markers',
            name: xLabel,
            //marker: {color: 'red'},
        },)
    })

    return data
}

function getData(inputs: Partial<ProcessFields>) {
    switch (inputs.feature!.code) {
        case "bar":
            return getBarData(inputs)
        case "table":
            return getTableData()
    }
    return []
}

function getLayoutData(inputs: Partial<ProcessFields>) {
    const layout: Partial<Layout> = {
        showlegend: inputs.showLegend,
        width: document.getElementById("plots")!.clientWidth - 100,
        autosize: true,
        font: {
            color: "blue",
        },
        title: {
            text: inputs.legendText,
            xanchor: inputs.legendAlignment,
            x: 0.5
        },
        legend: {
            title: {text: "Legend"}
        },
        xaxis: {title: inputs.xLabelName},
        yaxis: {title: inputs.yLabelName},
    }

    return layout
}

const PlotContent: FC<PlotContentProps> = ({index, data}) => {
    const {state, dispatch} = useDataAnalysis()

    function deletePlot() {

        MySwal.fire({
            icon: "warning",
            text: `You are about to delete ${data.feature.label} .`,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Yes continue"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: "delete_plot",
                    index: index
                })
                MyToast.fire({
                    icon: 'success',
                    title: 'Plot deleted !',
                })
            } else if (result.isDismissed) {
                MyToast.fire({
                    icon: 'info',
                    title: 'Changes are not applied'
                })
            }
        })

    }

    const d = getData(data)

    function modifyPlot() {

        dispatch({
            type: "set_params",
            params: data
        })
        dispatch({
            type: "set_current_index",
            index: index
        })
        MyToast.fire({
            icon: 'info',
            title: 'Click on Process to apply modifications'
        })
    }

    function cancelModification() {
        dispatch({
            type: "set_current_index",
            index: -1
        })
        MyToast.fire({
            icon: 'info',
            title: 'Modifications canceled'
        })
    }

    return (

        <KTCardBody className='border border-primary rounded mb-2'>
            <div className="d-flex justify-content-between border-bottom border-dark">
                <h2 className="fw-bolder">{data.feature.label}</h2>
                <div>
                    {
                        !(state.currentIndex == index) &&
                        <button className="btn btn-sm btn-warning mx-lg-5" onClick={modifyPlot}>Modify
                        </button>
                    }
                    {
                        state.currentIndex == index &&
                        <button className="btn btn-sm btn-danger mx-lg-5" onClick={cancelModification}>Cancel
                        </button>
                    }
                    <div onClick={deletePlot} className="btn btn-icon btn-sm btn-active-icon-primary">
                        <KTSVG path="/media/icons/duotune/abstract/abs012.svg"
                               className="svg-icon-muted svg-icon-2hx"/>
                    </div>
                </div>
            </div>
            <Plot
                data={d}
                layout={getLayoutData(data)}
            />
        </KTCardBody>
    );
};

export default PlotContent;
