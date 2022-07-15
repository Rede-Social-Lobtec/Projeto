import './style.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/no-photo.png';
import api from '../../services/api';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../components/contexts/AuthContext';
import { useParams } from 'react-router-dom';

import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut} from "react-icons/fi";

var logo = require('../../assets/logo.png')

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
            <div className="Avatar-img">
                <Link to={`../perfil-user/${id}`}>
                    {user.foto != '' ? 
                        <img src={user.foto} alt="Avatar" />   
                    :
                        <img src={avatar} alt="Avatar" />
                    }
                </Link>
            </div>
            <h4>{user.nome}</h4>
            <Link to="/feed">
                <FiHome color='#FFF' size={24}/>
                Feed
            </Link>
            <Link to="/pessoa">
                <FiUser color='#FFF' size={24}/>
                Pessoas
            </Link>
            <Link to="/grupo">
                <FiUsers color='#FFF' size={24}/>
                Grupos
            </Link>
            <button onClick={handleLogout}>
                <FiLogOut color='#FFF' size={24}/>
                Sair
            </button>
            {/* <a href="http://www.lobtec.com.br" target="_blank"> */}
            <img src={logo} alt="Logo Lobtec" className='logo-lobtec'/>
            {/* </a> */}
        </div>
    )
}
