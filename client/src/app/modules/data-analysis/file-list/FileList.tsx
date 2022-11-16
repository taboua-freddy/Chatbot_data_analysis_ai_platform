import {ListViewProvider, useListView} from './core/ListViewProvider'
import {FileQueryResponseProvider} from './core/FileQueryResponseProvider'
import {FilesListHeader} from './components/header/FilesListHeader'
import {KTCard} from "../../../../_metronic/helpers";
import {FilesTable} from "./table/FileTable";
import {UserEditModal} from "../../apps/user-management/users-list/user-edit-modal/UserEditModal";
import FileListContentHeader from "./FileListContentHeader";
import {QueryRequestProvider} from "../../../core/QueryRequestProvider";
import UploadFileModal from "./upload-file/UploadFileModal";


const FilesList = () => {
    return (
        <>
            <FileListContentHeader/>
            <KTCard>
                <FilesListHeader/>
                <FilesTable/>
            </KTCard>
            <UploadFileModal/>
        </>
    )
}

const FilesListWrapper = () => (
    <QueryRequestProvider>
        <FileQueryResponseProvider>
            <ListViewProvider>
                <FilesList/>
            </ListViewProvider>
        </FileQueryResponseProvider>
    </QueryRequestProvider>
)

export {FilesListWrapper}
