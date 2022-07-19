import './perfil.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import avatar from '../../assets/no-photo.png';

function Perfil() {

  const [post, setPost] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([{}]);
  const [seguindo, setSeguindo] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const [grupo, setGrupo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  var idUser = localStorage.getItem('id');

  const navigate = useNavigate();
  const { id } = useParams();
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

    async function loadSocial() {
      await api.get(`perfil/${id}`, config)
        .then((res) => {
          setSeguindo(res.data.seguindo);
          setSeguidores(res.data.seguidores);
          setGrupo(res.data.grupos);
        })
    }
    loadSocial();

    async function loadUser() {
      await api.get(`user/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    loadUser();

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
          }
        })
    }
    loadPost();

    setLoading(false);

  }, []);

  async function seguirUser() {
    var body = { "id_user": id }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    await api.put(`user`, body, config)
        .then((res) => {
            console.log(res.data.msg);
            if(res.data.msg == 'Você seguiu o usuário!'){
                setFollow(true);
            }
            if(res.data.msg == 'Você não está mais seguindo este usuário!'){
                setFollow(false);
            }
        })
}

  function verUser(id) {
    navigate(`../perfil/${id}`);
    window.location.reload();
  }

  return (
    <div className='perfil-container'>
      <div className='perfil-first'>
        <div className='perfil-info'>
          <img src={user.foto} alt="Avatar" />
          <div className='perfil-data'>
            <h3>{user.nome}</h3>
            <p>Email: {user.email}</p>
            <p>Dep:{user.departamento}</p>
            <p>Cargo:{user.cargo}</p>
            <p>Tel:{user.telefone}</p>
            <p>Aniversário:{user.data_nascimento}</p>
          </div>
          <div className='perfil-seguir'>
          {idUser != JSON.stringify(id) && follow ? <button key={id} onClick={seguirUser}>Seguindo</button>:
            <button key={id}  onClick={seguirUser}>Seguir</button>}
          </div>
          {idUser == JSON.stringify(id) &&
            <div className='perfil-editar'>
              <button className='bota-editar' onClick={() => {setModalOpen(true)}}>
                Editar
            </button>
            </div>
          }
            {modalOpen && <Modal setOpenModal={setModalOpen}/>}
        
          
        </div>
        <div className='perfil-list'>
          <p className='list'>Seguindo...</p>
          <ul>
            {!loading && seguindo.length > 0 && seguindo.map((m) => {
              return (
                <li key={m._id}>
                  <button className='button-list' onClick={() => { verUser(m._id) }}>
                    {m.foto != '' ?
                      <img src={m.foto} alt="Avatar" />
                      :
                      <img src={avatar} alt="Avatar" />
                    }
                    <p>{m.nome}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='perfil-list'>
          <p className='list'>Seguidores...</p>
          <ul>
            {!loading && seguidores.length > 0 && seguidores.map((m) => {
              return (
                <li key={m._id}>
                  <button className='button-list' onClick={() => { verUser(m._id) }}>
                    {m.foto != '' ?
                      <img src={m.foto} alt="Avatar" />
                      :
                      <img src={avatar} alt="Avatar" />
                    }
                    <p>{m.nome}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='perfil-list'>
          <p className='list'>Grupos...</p>
          <ul>
            {!loading && grupo.length > 0 && grupo.map((m) => {
              return (
                <li key={m._id}>
                  <button className='button-list' onClick={() => { verUser(m._id) }}>
                    <img src={avatar} alt="Avatar" />
                    <p>{m.nome}</p>
                  </button>
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
