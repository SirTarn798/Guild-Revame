import './FoundGame.css'
import { useNavigate } from 'react-router-dom';
function FoundGame(props) {
    const navigate = useNavigate();
    const gotoGame = () => {
        navigate(`/game/${props.data.id}`.slice(0,-1))
    }
    return( 
        <div className='foundGame' onClick={gotoGame}>
            <img src={props.data.url ? props.data.url : "/nopic.png"}/>
            <div className='gameDetail'>
                <h2>{props.data.name}</h2>
                <p>{props.data.storyline}</p>
            </div>
        </div>
    )
}

export default FoundGame;