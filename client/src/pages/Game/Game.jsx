import './Game.css'
import Navigator from '../../components/Navigator/Navigator';
import GameShowcase from '../../components/GameShowcase/GameShowCase';
import TopCurators from '../../components/TopCurators/TopCurators';
import useUserStore from '../../../lib/userStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Game() {
    const params = useParams();
    const gameID = params.gameID;
    const { currentUser } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    if (!currentUser) {
        return null;
    }
    return (
        <div className='gameContainer'>
            <Navigator />
            <GameShowcase gameID={gameID}/>
            <TopCurators />
        </div>
    )
}

export default Game;