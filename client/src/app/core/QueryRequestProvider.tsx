import React, {createContext, useContext, useState} from 'react'
import {
    initialQueryRequest,
    QueryRequestContextProps,
    QueryState,
} from '../../_metronic/helpers'

const QueryRequestContext = createContext<QueryRequestContextProps>(initialQueryRequest)

type Props = {
    children?: React.ReactNode
}

const QueryRequestProvider: React.FC<Props> = ({children}) => {
    const [state, setState] = useState<QueryState>(initialQueryRequest.state)

    const updateState = (updates: Partial<QueryState>) => {
        const updatedState = {...state, ...updates} as QueryState
        setState(updatedState)
    }

    return (
        <QueryRequestContext.Provider value={{state, updateState}}>
            {children}
        </QueryRequestContext.Provider>
    )
}

const useQueryRequest = () => useContext(QueryRequestContext)
export {QueryRequestProvider, useQueryRequest}
