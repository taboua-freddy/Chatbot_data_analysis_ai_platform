/* eslint-disable react-hooks/exhaustive-deps */
import React, {FC, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {
    createResponseContext,
    initialQueryResponse,
    initialQueryState,
    PaginationState,
    QUERIES,
    stringifyRequestQuery,
} from '../../../../_metronic/helpers'
import {getFiles} from './_requests'
import {File} from './_file-models'
import {useQueryRequest} from "../../../core/QueryRequestProvider";

const QueryResponseContext = createResponseContext<File>(initialQueryResponse)

const FileQueryResponseProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
    const {state} = useQueryRequest()
    const [query, setQuery] = useState<string>(stringifyRequestQuery(state))
    const updatedQuery = useMemo(() => stringifyRequestQuery(state), [state])

    useEffect(() => {
        if (query !== updatedQuery) {
            setQuery(updatedQuery)
        }
    }, [updatedQuery])

    const {
        isFetching,
        refetch,
        data: response,
    } = useQuery(
        `${QUERIES.USERS_LIST}-${query}`,
        () => {
            return getFiles(query)
        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </QueryResponseContext.Provider>
    )
}

const useFileQueryResponse = () => useContext(QueryResponseContext)

const useFileQueryResponseData = () => {
    const {response} = useFileQueryResponse()
    if (!response) {
        return []
    }

    return response?.data || []
}

const useFileQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useFileQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useFileQueryResponseLoading = (): boolean => {
    const {isLoading} = useFileQueryResponse()
    return isLoading
}

export {
    FileQueryResponseProvider,
    useFileQueryResponse,
    useFileQueryResponseData,
    useFileQueryResponsePagination,
    useFileQueryResponseLoading,
}
