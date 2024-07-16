import { useNavigate } from 'react-router-dom';
import './TopCurator.css'

function TopCurator(props) {

    const navigate = useNavigate();

    const handleClickUser = () => {
        navigate(`/user/${props.username}`)
    }

    return(
        <div className='topCurator' onClick={handleClickUser}>
            <img src={props.pfp}/>
            <p>{props.username}</p>
        </div>
    )
}

export default TopCurator;