import React, {createContext, FC, useContext, useReducer, useState} from 'react';
import {
    actionType,
    initProcessFields,
    initProcessFieldsContextProps,
    ProcessFields,
    ProcessFieldsContextProps, reduceType
} from "./_dataA-models";

const DataAnalysisContext = createContext<ProcessFieldsContextProps>(initProcessFieldsContextProps)


function reducer(state: reduceType, action: actionType) {
    switch (action.type) {
        case "set_params":
            if (!action.params) break
            return {...state, dataFields: {...initProcessFields, ...action.params}}
        case "add_plot":
            const indexes = Array.from(state.listDataFields.keys())
            let key: number = state.currentIndex == -1 ? ((indexes.length > 0) ? indexes[indexes.length - 1] + 1 : 0) : state.currentIndex
            state.listDataFields.set(key, {...state.dataFields})
            return {
                ...state,
                currentIndex: -1,
                dataFields: {...initProcessFields},
                listDataFields: state.listDataFields
            }
        case "update_plot":
            if (!action.indexes) break

            const a = state.listDataFields.get(action.indexes.newIndex)
            const b = state.listDataFields.get(action.indexes.prevIndex)

            if (a && b) {
                state.listDataFields
                    .set(action.indexes.newIndex, b)
                    .set(action.indexes.prevIndex, a)
            }
            return {...state, listDataFields: state.listDataFields}
        case "delete_plot":
            if (action.index == undefined) break

            state.listDataFields.delete(action.index)
            return {...state, listDataFields: state.listDataFields}
        case "add_params":
            if (!action.params) break

            state.dataFields = {...state.dataFields, ...action.params}
            return {...state, dataFields: {...state.dataFields}}

        case "set_current_index":
            if (action.index == undefined) break
            if (action.index == -1)
                return {...state, dataFields: {...initProcessFields}, currentIndex: action.index}
            return {...state, currentIndex: action.index}
    }
    return init(state)
}

function init(data: reduceType) {
    return {...data}
}

const DataAnalysisProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initProcessFieldsContextProps.state, init);

    return (
        <DataAnalysisContext.Provider value={{
            dispatch,
            state
        }}>
            {children}
        </DataAnalysisContext.Provider>
    );
};

const useDataAnalysis = () => useContext(DataAnalysisContext);

export {DataAnalysisProvider, useDataAnalysis};
