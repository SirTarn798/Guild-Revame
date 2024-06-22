import { useParams } from 'react-router-dom'
import './SearchGame.css'
import Navigator from '../../components/Navigator/Navigator';
import TopCurators from '../../components/TopCurators/TopCurators';
import SearchGamePanel from '../../components/SearchGamePanel/SearchGamePanel';

function SearchGame() {
    const params = useParams();
    const gameName = params.gameName;
    return(
        <div className='searchGameContainer'>
            <Navigator/>
            <SearchGamePanel gameName={gameName}/>
            <TopCurators/>
        </div>
    )
}

export default SearchGame;
