import './Following.css'
import Navigator from '../../components/Navigator/Navigator'
import TopCurators from '../../components/TopCurators/TopCurators'
import FollowingContent from '../../components/FollowingContent/FollowingContent'

function Following() {
    return(
        <div className='followingContainer'>
            <Navigator/>
            <FollowingContent/>
            <TopCurators/>
        </div>
    )
}

export default Following;