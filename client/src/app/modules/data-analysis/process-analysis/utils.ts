type featureType = {
    code: string, label: string, category?: string, hasSubOption?: boolean
}

const featureOptions: Map<string, Array<featureType>> = new Map<string, Array<featureType>>([
    ["Data Exploration", [{code: "show-df", label: "Show Data"}, {code: "optimize-df", label: "Optimize Data"}]],
    ["Data Visualization", [{code: "bar-chart", label: "Bar Chart"}, {code: "pie-chart", label: "Pie Chart"}]]
])

function getFeatureOptions() {
    let options: Array<featureType> = []
    Array.from(featureOptions).map((values) => {
        return values[1].map((val) => {
            return {...val, category: values[0]}
        })
    }).forEach((value) => {
        options.push(...value)
    });

    return options
}


export {featureOptions, getFeatureOptions}
export type {featureType}
