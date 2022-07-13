import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

// import Header from '../../components/Header';


function Perfil() {

    const [user, setUser] = useState([{}]);
    const { id } = useParams();

    useEffect(() => {
        // console.log(id);
        async function loadUser() {
            await api.get(`user/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
        }
        loadUser();
    }, []);

    return (
        <div className='container'>
            <div className='content1'>
                {
                user.foto != '' ? 
                <img src={require(user.foto)} />
                : 
                <img src={require('../../assets/no-photo.png')} />
                }
                <h2>{user}</h2>
            </div>
            <div className='content2'>
                <span>Departamento: {user.departamento}</span>
                {/* <span>Cargo: {user.cargo}</span> */}
            </div>
            <div className='content3'>
                {/* <ul>
                    {user.seguindo.map((item) => {
                        return (
                            <li key={item._id}>
                                <div className='card'>
                                    <div className='card-body'>
                                        {
                                        user.foto != '' ? 
                                        <img src={require(user.foto)} />
                                        : 
                                        <img src={require('../../assets/no-photo.png')} />
                                        }
                                        <h2>seguindo1</h2>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul> */}
            </div>
            <div className='content4'>content4</div>
            <div className='content5'>content5</div>
        </div>
    )
}

export default Perfil;