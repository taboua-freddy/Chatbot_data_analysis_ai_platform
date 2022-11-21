import React, {createContext, FC, useContext, useMemo, useState} from 'react'
import {
    calculatedGroupingIsDisabled,
    calculateIsAllDataSelected,
    groupingOnSelect,
    groupingOnSelectAll,
    ID,
    initialListView,
    ListViewContextProps,
} from '../../../../_metronic/helpers'
import {useFileQueryResponse, useFileQueryResponseData} from './FileQueryResponseProvider'
import {FileError} from "react-dropzone";

const ListViewContext = createContext<ListViewContextProps>(initialListView)

const ListViewProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
    const [filesToUpload, setFilesToUpload] = useState<Map<string, { file: File; errors: FileError[] }> | undefined>(initialListView.filesToUpload);
    const [selected, setSelected] = useState<Array<ID>>(initialListView.selected)
    const [itemIdForUpdate, setItemIdForUpdate] = useState<ID>(initialListView.itemIdForUpdate)
    const {isLoading} = useFileQueryResponse()
    const data = useFileQueryResponseData()
    const disabled = useMemo(() => calculatedGroupingIsDisabled(isLoading, data), [isLoading, data])
    const isAllSelected = useMemo(() => calculateIsAllDataSelected(data, selected), [data, selected])

    return (
        <ListViewContext.Provider
            value={{
                filesToUpload,
                setFilesToUpload,
                selected,
                itemIdForUpdate,
                setItemIdForUpdate,
                disabled,
                isAllSelected,
                onSelect: (id: ID) => {
                    groupingOnSelect(id, selected, setSelected)
                },
                onSelectAll: () => {
                    groupingOnSelectAll(isAllSelected, setSelected, data)
                },
                clearSelected: () => {
                    setSelected([])
                },
            }}
        >
            {children}
        </ListViewContext.Provider>
    )
}

const useListView = () => useContext(ListViewContext)

export {ListViewProvider, useListView}
