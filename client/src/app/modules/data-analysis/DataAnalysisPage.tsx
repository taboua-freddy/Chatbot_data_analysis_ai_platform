import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {FilesListWrapper} from "./file-list/FileList";
import {ProcessAnalysisWrapper} from "./process-analysis/ProcessAnalysisPage"


const dataAnalysisBreadCrumbs: Array<PageLink> = [
    {
        title: 'Data Analysis',
        path: '/data-analysis',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const DataAnalysisPage = () => {
    return (
        <Routes>
            <Route element={<Outlet/>}>
                <Route
                    path='files'
                    element={
                        <>
                            <PageTitle breadcrumbs={dataAnalysisBreadCrumbs}>My Files</PageTitle>
                            <FilesListWrapper/>
                        </>
                    }
                />
                <Route
                    path='process-analysis/:id'
                    element={
                        <>
                            <PageTitle breadcrumbs={dataAnalysisBreadCrumbs}>Process Data Analysis</PageTitle>
                            <ProcessAnalysisWrapper/>
                        </>
                    }
                />
                <Route index element={<Navigate to='/data-analysis/files'/>}/>
            </Route>
        </Routes>
    )
}


export default DataAnalysisPage;
