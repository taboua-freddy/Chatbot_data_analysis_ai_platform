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
} from '../../../../../../_metronic/helpers'
import {getUsers} from './_requests'
import {User} from './_models'
import {useQueryRequest} from "../../../../../core/QueryRequestProvider";

const QueryResponseContext = createResponseContext<User>(initialQueryResponse)

const UserQueryResponseProvider: FC<{ children?: React.ReactNode }> = ({children}) => {
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
            return getUsers(query)
        },
        {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
    )

    return (
        <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query}}>
            {children}
        </QueryResponseContext.Provider>
    )
}


const useUserQueryResponse = () => useContext(QueryResponseContext)

const useUserQueryResponseData = () => {
    const {response} = useUserQueryResponse()
    if (!response) {
        return []
    }

    return response?.data || []
}

const useUserQueryResponsePagination = () => {
    const defaultPaginationState: PaginationState = {
        links: [],
        ...initialQueryState,
    }

    const {response} = useUserQueryResponse()
    if (!response || !response.payload || !response.payload.pagination) {
        return defaultPaginationState
    }

    return response.payload.pagination
}

const useUserQueryResponseLoading = (): boolean => {
    const {isLoading} = useUserQueryResponse()
    return isLoading
}

export {
    UserQueryResponseProvider,
    useUserQueryResponse,
    useUserQueryResponseData,
    useUserQueryResponsePagination,
    useUserQueryResponseLoading,
}

