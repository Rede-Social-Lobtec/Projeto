import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

function Perfil(){

    const [user, setUser] = useState({});
    const {id} = useParams();
    
    useEffect(()=>{
        // console.log(id);
        async function loadUser(){
            const response = await api.get(`user/${id}`);
            setUser(response.data);
        }
        loadUser();
    }, [])

    return(
        <div className='container'>
            {JSON.stringify(user)}
        </div>
    )

}

export default Perfil;