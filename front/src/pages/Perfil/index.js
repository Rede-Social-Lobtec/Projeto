import './perfil.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate, Link} from 'react-router-dom';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import avatar from '../../assets/no-photo.png';
import { AiFillLike, AiOutlineComment, AiFillStar} from 'react-icons/ai';
const loadingGIF = require('../../assets/loading.gif');

function Perfil() {

  const [post, setPost] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState([{}]);
  const [seguindo, setSeguindo] = useState([]);
  const [seguidores, setSeguidores] = useState([]);
  const [grupo, setGrupo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  const [loaded, setLoaded] = useState(false);
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
      await api.get(`postsUser/${id}`, config)
        .then((res) => {
          setPost(res.data);
          setLoaded(true);
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
        if (res.data.msg == 'Você seguiu o usuário!') {
          setFollow(true);
          alert('Você seguiu o usuário');
        }
        if (res.data.msg == 'Você não está mais seguindo este usuário!') {
          setFollow(false);
          alert('Você deixou de seguir o usuário');
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
            {idUser != JSON.stringify(id) && <button key={id} onClick={seguirUser}>Seguir</button>}
          </div>
          {idUser == JSON.stringify(id) &&
            <div className='perfil-editar'>
              <button className='bota-editar' onClick={() => { setModalOpen(true) }}>
                Editar
              </button>
            </div>
          }
          {modalOpen && <Modal setOpenModal={setModalOpen} />}


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
        <h1>Posts</h1>
        <div className='div-posts perfil'>
          <ul>
            {!loaded &&
              <div>
                <h3>Carregando posts... <img src={loadingGIF} className="loading-gif" /></h3>
              </div>
            }
            {loaded && post.length == 0 && <h3>Ainda não há publicações!</h3>}
            {loaded && post.length > 0 && post.map((p) => {
              var arrayDataHora = p.data.split(" ");
              var data = arrayDataHora[0];
              var hora = arrayDataHora[1];
              hora = hora.slice(0, hora.length - 3);

              return (
                <li key={p._id} className="div-post">
                  <div className='post-header'>
                    <Link to={`../perfil/${id}`}>
                      {user.foto != undefined ?
                        <img src={user.foto} alt="foto" className='img-user' />
                        :
                        <img src={avatar} alt="foto" className='img-user' />
                      }
                      <div>
                        {user != undefined ?
                          <strong>{user.nome}</strong>
                          :
                          <strong>-- Nome usuário</strong>
                        }
                        <p>{data} às {hora}</p>
                      </div>
                    </Link>
                    {user.admin && <AiFillStar color="#670067" />}
                  </div>
                  <div className='post-content'>
                    <p>{p.descricao}</p>
                  </div>
                  <div className='post-footer'>
                    <div className='div-interacoes-post'>
                      <div className='div-total-likes'>
                        <Link to={`/detalhePost/${p._id}`}>
                          <AiFillLike color="#727272" className='total-likes-icon' />
                          {p.curtidaDetalhe.length}
                        </Link>
                      </div>

                      <div className='div-post-comments'>
                        <Link to={`/detalhePost/${p._id}`}>
                          <p>ver comentários</p>
                          <AiOutlineComment color="#727272" className='post-comments-icon' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <Header />
    </div>
  )
}

export default Perfil;
