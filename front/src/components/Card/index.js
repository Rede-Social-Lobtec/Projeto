function Card(){
    return(
        <div className="card">
            <img src={require('../../assets/no-photo.png')}></img>
            <div className='card-container'>
                <h4><b>John Snow</b></h4>
                <p>Desenvolvedor</p>
                <button>Seguir</button>
            </div>
        </div>
    )
}

export default Card;