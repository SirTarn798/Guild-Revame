import './EditUser.css'
import Navigator from '../../components/Navigator/Navigator'
import TopCurators from '../../components/TopCurators/TopCurators'
import EditUserPanel from '../../components/EditUserPanel/EditUserPanel'

function EditUser() {
    return(
        <div className='editUserContainer'>
            <Navigator/>
            <EditUserPanel/>
            <TopCurators/>
        </div>
    )
}

export default EditUser;