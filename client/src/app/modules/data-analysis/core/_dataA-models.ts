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
    feature: string
} & YFields & XFields & LegendFields & BarDataFields


const initProcessFields: ProcessFields = {
    feature: "",
    showLegend: false
}

type ProcessFieldsContextProps = {
    dataFields: ProcessFields
    listDataFields: Map<number, ProcessFields>
    setParamsFieldsPartial: (fields: Partial<ProcessFields>) => void
    updateListDataFields: (add: boolean, newIndex?: number, prevIndex?: number) => void
}

const initProcessFieldsContextProps: ProcessFieldsContextProps = {
    dataFields: initProcessFields,
    listDataFields: new Map<number, ProcessFields>(),
    setParamsFieldsPartial: (fields) => {
    },
    updateListDataFields: (add: boolean, newIndex?: number, prevIndex?: number) => {
    }
}


export {initProcessFields, initProcessFieldsContextProps}
export type {ProcessFields, ProcessFieldsContextProps, YFields, XFields, BarDataFields, LegendFields}