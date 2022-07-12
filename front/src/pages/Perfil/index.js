import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function Perfil() {

    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        // console.log(id);
        async function loadUser() {
            const response = await api.get(`user/${id}`);
            setUser(response.data);
        }
        loadUser();
    }, [])

    return (
        <div className='container'>
            <div className='left-area'>
                <img className="user-logo" src={require('../../assets/user-logo.png')} />
                <div className='user-info'>{user.nome} <br />{user.email} <br />{user.departamento}</div>
            </div>
            <div className='right-area'>

            </div>
        </div>
    )

}

export default Perfil;