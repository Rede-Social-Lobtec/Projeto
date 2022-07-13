import './style.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/no-photo.png';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../components/contexts/AuthContext';
import { useParams } from 'react-router-dom';


import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut} from "react-icons/fi";

export default function Header(){
    const {handleLogout} = useContext(Context);
    const [user, setUser] = useState([{}]);
    const [post, setPost] = useState([{}]);
    const { id } = useParams();

    return(
        <div className='sidebar'>
            <div>
                <h4></h4>
            </div>
            <div className="Avatar-img">
                    <img src={avatar} alt="Avatar" />
                    </div>
            <Link to="/perfil">
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


