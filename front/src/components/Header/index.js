import './style.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/no-photo.png';
import api from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../components/contexts/AuthContext';
import { useParams } from 'react-router-dom';


import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut} from "react-icons/fi";

export default function Header(){
    const {handleLogout} = useContext(Context);
    const [user, setUser] = useState([{}]);    
    
    var id = JSON.parse(localStorage.getItem('id'));

    useEffect(() => {
        async function loadUser() {
            await api.get(`user/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        loadUser();
    }, []);

    return(
        <div className='sidebar'>
            <div>
                <h4>{JSON.stringify(user.nome)}</h4>
            </div>
            <div className="Avatar-img">
                {user.foto != '' ? 
                    <img src={user.foto} alt="Avatar" />   
                :
                    <img src={avatar} alt="Avatar" />
                }
            </div>
            <Link to={"/perfil/"+ id}>
                <FiUser color='#FFF' size={24}/>
                Perfil
            </Link>
            <Link to="/feed">
                <FiHome color='#FFF' size={24}/>
                Feed
            </Link>
            <Link to="/grupo">
                <FiUsers color='#FFF' size={24}/>
                Grupos
            </Link>
            <button onClick={handleLogout}>
                <FiLogOut color='#FFF' size={24}/>
                Sair
            </button>
        </div>
    )
}


