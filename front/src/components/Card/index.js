import './card.css';

function Card(props){
    return(
        <div className="card">
            <img src={require('../../assets/no-photo.png')}></img>
            <div className='card-container'>
                <h4><b>{props.nome}</b></h4>
                <p>{props.cargo}</p>
            </div>
        </div>
    )
}

export default Card;