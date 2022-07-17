import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './cardGrupo.css';

function CardGrupo(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(false);
        // Vai ser usado no Grupo detalhe junto da lista
        // async function getMembers(){
        //     await api.get(`group/${props.id}/members`, config)
        //     .then((res)=>{
        //         var {membros} = (res.data);
        //         listaMembers.push(membros);
        //     })
        // }
        // getMembers();
        // setMembers(listaMembers);

    }, [])

    function verGrupo() {
        navigate(`../grupo/${props.id}`)
    }
    return (
        <div className="card-grupo">
            <button onClick={verGrupo}>
                <div className='card-grupo-container'>
                    <img src={require('../../assets/no-photo.png')}></img>
                    <div className='grupo-text'>
                        <h4>{props.nome}</h4>
                        <p>{props.descricao}</p>
                        {/* <div className='grupo-follow'>
                        {members.length > 0 && members.map((m) => {
                            return (
                                <div key={m._id}>
                                    <div>
                                        <Link to={`../perfil/${m._id}`}>
                                            <img src={avatar} alt="Avatar" className='img-user' />
                                            <p>{m.nome}</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div> */}
                    </div>
                    
                </div>
            </button>

        </div>
    )

}

export default CardGrupo;