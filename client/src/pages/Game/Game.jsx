import './Game.css'
import Navigator from '../../components/Navigator/Navigator';
import GameShowcase from '../../components/GameShowcase/GameShowCase';
import TopCurators from '../../components/TopCurators/TopCurators';
import useUserStore from '../../../lib/userStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Game() {

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
            <GameShowcase />
            <TopCurators />
        </div>
    )
}

export default Game;