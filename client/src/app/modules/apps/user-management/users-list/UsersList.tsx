import {ListViewProvider, useListView} from './core/ListViewProvider'
import {UserQueryResponseProvider} from './core/UserQueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {UserEditModal} from './user-edit-modal/UserEditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import {QueryRequestProvider} from "../../../../core/QueryRequestProvider";

const UsersList = () => {
    const {itemIdForUpdate} = useListView()
    return (
        <>
            <KTCard>
                <UsersListHeader/>
                <UsersTable/>
            </KTCard>
            {itemIdForUpdate !== undefined && <UserEditModal/>}
        </>
    )
}

const UsersListWrapper = () => (
    <QueryRequestProvider>
        <UserQueryResponseProvider>
            <ListViewProvider>
                <UsersList/>
            </ListViewProvider>
        </UserQueryResponseProvider>
    </QueryRequestProvider>
)

export {UsersListWrapper}
