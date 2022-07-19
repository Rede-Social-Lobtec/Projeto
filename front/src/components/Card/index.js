import { useEffect, useState } from 'react';
import { renderMatches, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './card.css';

function Card(props) {

    const [cargo, setCargo] = useState('-----');
    const [seguindo, setSeguindo] = useState([]);
    const [follow, setFollow] = useState(false);
    const navigate = useNavigate();

    var token = JSON.parse(localStorage.getItem('token'));

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        if (props.cargo !== null || undefined) {
            setCargo(props.cargo)
        }

        async function loadSocialInfo() {
            api.get('user', config)
                .then((res) => {
                    setSeguindo(res.data.seguindo);
                })
                .catch(err => {
                    console.log(err);
                });

        }
        loadSocialInfo();

        seguindo.forEach(s => {
            if(s._id == props.id){
            }
        });

        
    }, [])

    async function seguirUser() {
        var body = { "id_user": props.id }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        await api.put(`user`, body, config)
            .then((res) => {
                console.log(res.data.msg);
                if(res.data.msg == 'Você seguiu o usuário!'){
                    setFollow(true);
                    toast.success(`Você está seguindo ${props.nome}`);
                }
                if(res.data.msg == 'Você não está mais seguindo este usuário!'){
                    setFollow(false);
                    toast.success(`Você não está mais seguindo ${props.nome}`);
                }
            })
    }

    function verUser() {
        navigate(`../perfil/${props.id}`)
    }
    return (
        <div className="card">
            <button onClick={verUser}>
                <div className='card-container'>
                    {props.foto != ''?
                    <img src={props.foto}></img>
                    :
                    <img src={require('../../assets/no-photo.png')}></img>
                    }
                    <h4><b>{props.nome}</b></h4>
                    <p>{cargo}</p>
                </div>
            </button>
            {follow ? <button key={props.id} className="following" onClick={seguirUser}>Seguindo</button>:
            <button key={props.id} className="follow" onClick={seguirUser}>Seguir</button>}
           
        </div>
    )
}

export default Card;