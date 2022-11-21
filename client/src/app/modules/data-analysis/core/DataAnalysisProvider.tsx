import React, {createContext, FC, useContext, useState} from 'react';
import {
    initProcessFields,
    initProcessFieldsContextProps,
    ProcessFields,
    ProcessFieldsContextProps
} from "./_dataA-models";

const DataAnalysisContext = createContext<ProcessFieldsContextProps>(initProcessFieldsContextProps)

const DataAnalysisProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
    const [dataFields, setDataFields] = useState(initProcessFields);
    const [listDataFields, setListDataFields] = useState(new Map<number, ProcessFields>());
    const setParamsFieldsPartial = (data: Partial<ProcessFields>) => {
        setDataFields(prevState => {
            return {...prevState, ...data}
        })
    }
    const updateListDataFields = (add: boolean, newIndex?: number, prevIndex?: number) => {
        if ((!newIndex || !prevIndex) && !add) return

        if (add) {
            listDataFields.set(listDataFields.size, dataFields)
        } else {
            const a = listDataFields.get(newIndex!)
            const b = listDataFields.get(prevIndex!)
            if (a && b) {
                listDataFields.set(newIndex!, b)
                listDataFields.set(prevIndex!, a)
            }
        }
        setListDataFields(listDataFields)
    }
    return (
        <DataAnalysisContext.Provider value={{
            dataFields,
            setParamsFieldsPartial,
            listDataFields,
            updateListDataFields
        }}>
            {children}
        </DataAnalysisContext.Provider>
    );
};

const useDataAnalysis = () => useContext(DataAnalysisContext);

export {DataAnalysisProvider, useDataAnalysis};
