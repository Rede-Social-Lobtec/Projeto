import './style.css';
import { Link } from 'react-router-dom';

import { FiHome, FiUser, FiUsers, FiSettings, FiLogOut} from "react-icons/fi";

export default function(){
    return(
        <div className='sidebar'>
            <div>
                <h4></h4>
            </div>
            <Link to="/feed">
                <FiHome color='#FFF' size={24}/>
                Feed
            </Link>
            <Link to="/perfil">
                <FiUser color='#FFF' size={24}/>
                Perfil
            </Link>
            <Link to="/grupo">
                <FiUsers color='#FFF' size={24}/>
                Grupos
            </Link>
            <Link to="#">
                <FiSettings color='#FFF' size={24}/>
                Opções
            </Link>
            <Link to="#">
                <FiLogOut color='#FFF' size={24}/>
                Sair
            </Link>
        </div>
    )
}