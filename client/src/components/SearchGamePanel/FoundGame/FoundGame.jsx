import './FoundGame.css'

function FoundGame(props) {
    return(
        <div className='foundGame'>
            <img src={props.data.url}/>
            <div className='gameDetail'>
                <h2>{props.data.name}</h2>
                <p>{props.data.storyline}</p>
            </div>
        </div>
    )
}

export default FoundGame;