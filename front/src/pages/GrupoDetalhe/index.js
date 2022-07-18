import './grupo-detalhe.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { AiOutlineUserAdd, AiOutlineUserDelete } from 'react-icons/ai';

const avatar = require('../../assets/no-photo.png');

function GrupoDetalhe() {

    const [grupo, setGrupo] = useState([{}]);
    const [post, setPost] = useState([{}]);
    const [notMember, setNotMember] = useState(false);
    const [members, setMembers] = useState([]);
    const [member, setMember] = useState("");
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [removeOpen, setRemoveOpen] = useState(false);
    const navigate = useNavigate();
    var token = JSON.parse(localStorage.getItem('token'));
    const { id } = useParams();
    var idUser = localStorage.getItem('id');
    var idAdm = JSON.stringify(grupo.id_adm);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    function handleAdd(e) {
        e.preventDefault();
        addUser();
    }

    function handleRemove(e) {
        e.preventDefault();
        removeUser();
    }

    async function addUser() {
        var body = {
            action: 'add'
        }
        await api.put(`group/${id}/member/${member}`, body)
            .then((res) => {
                alert('Usuário adicionado');
                window.location.reload();
            })
        setAddOpen(false);
    }

    async function removeUser() {
        var body = {
            action: 'remove'
        }
        await api.put(`group/${id}/member/${member}`, body)
            .then((res) => {
                alert('Usuário removido');
                window.location.reload();
            })
        setRemoveOpen(false);
    }



    useEffect(() => {
        async function loadGrupo() {
            await api.get(`group/${id}`)
                .then((res) => {
                    setGrupo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadGrupo();

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
        <div className='group-container'>
            <h1>Página Grupo detalhe</h1>
            <div className='group-first'>
                <div className='group-info'>
                    <h3>{grupo.nome}</h3>
                    <p>{grupo.descricao}</p>
                </div>
                <div className='group-list'>
                    <p className='seguidores'>Seguidores...</p>
                    <ul>
                        {!loading && members.length > 0 && members.map((m) => {
                            return (
                                <li key={m._id}>
                                    <button className='group-followed' onClick={() => { verUser(m._id) }}>
                                        <img src={avatar} alt="Avatar" />
                                        <p>{m.nome}</p>
                                    </button>
                                </li>
                            )
                        })}

                        {idUser == idAdm &&
                            <div className='add-remove'>
                                <div className='add-user'>
                                    <button onClick={() => { setAddOpen(!addOpen) }}>
                                        <AiOutlineUserAdd color='#FFF' size={35} />
                                        <p>Adicionar usuário</p>
                                    </button>
                                    <div onSubmit={handleAdd} className={addOpen ? 'add-content show' : 'add-content'}>
                                        <input type='text' placeholder='ID do membro' value={member} onChange={(e) => setMember(e.target.value)}></input>
                                        <button type='submit' className='add-button' onClick={handleAdd}>Add+</button>
                                    </div>
                                </div>
                                <div className='remove-user'>
                                    <button onClick={() => { setRemoveOpen(!removeOpen) }}>
                                        <AiOutlineUserDelete color='#FFF' size={35} />
                                        <p>Remover usuário</p>
                                    </button>
                                    <div onSubmit={handleRemove} className={removeOpen ? 'add-content show' : 'add-content'}>
                                        <input type='text' placeholder='ID do membro' value={member} onChange={(e) => setMember(e.target.value)}></input>
                                        <button type='submit' className='add-button' onClick={handleRemove}>Remove-</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </ul>
                </div>
            </div>
            <div className='group-posts'>
                <h3>Posts</h3>

            </div>
            <Header />
        </div>
    )
}

export default GrupoDetalhe;