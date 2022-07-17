import { Link } from 'react-router-dom';
import './DadosPerfil.css'
import api from '../../services/api';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Header from '../../components/Header';
const avatar = require('../../assets/no-photo.png');

export default function DadosPerfil() {
  const [posts, setPosts] = useState([]);
  const [temaPost, setTemaPost] = useState('');
  const [curtidas, setCurtidas] = useState([]);
  const [user, setUser] = useState([{}]);

  const [post, setPost] = useState([{}]);
  const { id } = useParams();
  var token = JSON.parse(localStorage.getItem('token'));

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

        <div className='DFpeople-followed'>
        <h1>Dados do Perfil</h1>

                    <div>
         Nome: {JSON.stringify(user.nome)}
                    </div>
                    <div>
          Email: {JSON.stringify(user.email)}
                    </div>                    <div>
         Cargo: {JSON.stringify(user.cargo)}
                    </div>                    
                    <div>
         Departamento: {JSON.stringify(user.departamento)}
                    </div>                        
                    
                    <div>     
         Telefone: {JSON.stringify(user.telefone)}
                    </div>                      <div>
         Data de Nascimento: {JSON.stringify(user.data_nascimento)}


        
       

</div>
      
    </div>
  )
}
















