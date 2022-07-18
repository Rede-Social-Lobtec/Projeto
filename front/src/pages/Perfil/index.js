import './stylePerfil.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AiFillLike, AiOutlineComment, AiFillStar } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
import {Context} from '../../components/contexts/AuthContext';
import avatar from '../../assets/no-photo.png';
import { FiHome, FiUsers, FiUser, FiSettings, FiLogOut} from "react-icons/fi";
// const avatar = require('../../assets/no-photo.png');



function Perfil() {

    const [grupo, setGrupo] = useState([{}]);
    const [post, setPost] = useState([{}]);
    const [notMember, setNotMember] = useState(false);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    var token = JSON.parse(localStorage.getItem('token'));
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [temaPost, setTemaPost] = useState('');
    const [curtidas, setCurtidas] = useState([]);
    const [user, setUser] = useState([{}]);
    const [following, setFollowing] = useState([]);
    const [Pseguidores, setPseguidores] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loaded, setLoaded] = useState(false);
    var token = JSON.parse(localStorage.getItem('token'));  
    var token = JSON.parse(localStorage.getItem('token'));
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {

        const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
        };
    
        function PerfilSeguindo() {
          api.get(`user/${id}`)
            .then((res) => {
              setFollowing(res.data.seguindo);
            })
            .catch(err => {
              console.log(err);
            });
    
        }
        PerfilSeguindo();
    
        setLoaded(true);
    
      }, []);

      useEffect(() => {

        const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
        };
    
        function PerfilSeguidores() {
          api.get(`user/${id}`)
            .then((res) => {
              setPseguidores(res.data.seguidores);
            })
            .catch(err => {
              console.log(err);
            });
    
        }
        PerfilSeguidores();
    
        setLoaded(true);
    
      }, []);

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

        async function getMembers() {
            await api.get(`group/${id}/members`, config)
                .then((res) => {
                    setMembers(res.data.membros);
                })
        }
        getMembers();

   

        async function loadPost() {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await api.get(`group/${id}/posts`, config)
                .then((res) => {
                    setPost(res.data);
                    if (res.data.msg == "Apenas usuários membros do grupo podem ver as publicações.") {
                        setNotMember(true);
                    }
                })
        }
        loadPost();
        setLoading(false);
    }, []);

    function verUser(id) {
        navigate(`../perfil/${id}`);
    }

    return (
        <div className='perfil-container'>
            <h1>Perfil</h1>
            <div className='perfil-first'>
                <div className='perfil-info'>
 

                <h1>Dados do Perfil</h1>
                




                <div className='perfil-info-avt'>

       
                    {user.foto != '' ? 
                        <img src={user.foto} alt="Avatar" />   
                    :
                        <img src={avatar} alt="Avatar" />
                    }


</div>





<div>
Nome: {user.nome}
</div>
<div>
Email: {user.email}
</div>                    <div>
Cargo: {user.cargo}
</div>                    
<div>
Departamento: {user.departamento}
</div>                        

<div>     
Telefone: {user.telefone}
</div>                      <div>
Data de Nascimento: {user.data_nascimento}

                </div>                
                </div>


<br></br>
              
              

    {/* <div className='div-social'> */}
      <div className='perfil-list'>
        <h1>Seguindo</h1>
        <div className='perfilseguidores'>
          <ul>
            {loaded && following.length > 0 && following.map((u) => {
              return (
                <li key={u._id}>
                  <div className='perfilperson-followed'>
                    <Link to={`../perfil/${u._id}`}>
                      <img src={avatar} alt="Avatar" className='perfilimg-user' />
                      <p>{u.nome}</p>
                    </Link>

                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      </div>
    {/* <div className='div-social'> */}
    <div className='perfil-list'>
        <h1>Seguidores</h1>
        <div className='perfilseguidores'>
          <ul>
            {loaded && Pseguidores.length > 0 && Pseguidores.map((u) => {
              return (
                <li key={u._id}>
                  <div className='perfilperson-followed'>
                    <Link to={`../perfil/${u._id}`}>
                      <img src={avatar} alt="Avatar" className='perfilimg-user' />
                      <p>{u.nome}</p>
                    </Link>

                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>



            <div className='perfil-posts'>
            <h3>Posts</h3>
                        
            </div>
            <Header />
            </div>

 
 
    )
}

export default Perfil;
