import { useNavigate } from 'react-router-dom';
import './TopGame.css'

function TopGame(props) {

    const navigate = useNavigate();
    const handleClickGame = () => {
        navigate(`/game/${props.id}`)
    }
    return(
        <div className='topGame' onClick={handleClickGame}>
            <img src={props.url}/>
            <p>{props.name}</p>
        </div>
    )
}

export default TopGame;