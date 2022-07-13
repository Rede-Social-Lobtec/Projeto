import './style.css';
import { Link } from 'react-router-dom';
import avatar from '../../assets/no-photo.png';
import { useContext } from 'react';
import {Context} from '../../components/contexts/AuthContext';

import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut} from "react-icons/fi";

export default function Header(){
    const {handleLogout} = useContext(Context);
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
            <Link to={handleLogout}>
                <FiLogOut color='#FFF' size={24}/>
                Sair
            </Link>
        </div>
    )
}


