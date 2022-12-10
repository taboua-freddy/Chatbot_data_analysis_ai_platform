import {featureType} from "../process-analysis/utils";
import React from "react";

type reduceType = {
    dataFields: ProcessFields
    listDataFields: Map<number, ProcessFields>
    currentIndex: number
}

type actionType = {
    type: "add_plot" | "update_plot" | "delete_plot" | "add_params" | "set_params" | "set_current_index"
    indexes?: {
        newIndex: number
        prevIndex: number
    }
    index?: number
    params?: Partial<ProcessFields>
}

type YFields = {
    yLabelName?: string
}

type XFields = {
    xLabelName?: string
}

type LegendFields = {
    showLegend: boolean
    legendText?: string
    legendAlignment?: "left" | "center" | "right" | "auto" | undefined
}

type BarDataFields = {
    xLabel?: string[]
    groupBy?: string
}

type ProcessFields = {
    feature: featureType
} & YFields & XFields & LegendFields & BarDataFields


const initProcessFields: ProcessFields = {
    feature: {code: undefined, label: ""},
    showLegend: false
}

type ProcessFieldsContextProps = {
    dispatch: React.Dispatch<actionType>
    state: reduceType
}

const initProcessFieldsContextProps: ProcessFieldsContextProps = {
    dispatch: () => {
    },
    state: {listDataFields: new Map<number, ProcessFields>(), dataFields: {...initProcessFields}, currentIndex: -1}
}


export {initProcessFields, initProcessFieldsContextProps}
export type {
    ProcessFields,
    ProcessFieldsContextProps,
    YFields,
    XFields,
    BarDataFields,
    LegendFields,
    actionType,
    reduceType
}