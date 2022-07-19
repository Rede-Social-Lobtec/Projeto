import './detalhe-post.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import { useParams } from 'react-router-dom';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai';
import Social from '../../components/Social';

const avatar = require('../../assets/no-photo.png');
const loadingGIF = require('../../assets/loading.gif')

export default function DetalhePost() {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [post, setPost] = useState({});
    const [curtidas, setCurtidas] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    const [userLike, setUserLike] = useState(false);
    const [texto, setTexto] = useState("");
    const [user, setUser] = useState({});

    var token = JSON.parse(localStorage.getItem('token'));
    var id_user = JSON.parse(localStorage.getItem('id'));

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        async function loadPost() {
            await api.get(`post/${id}/interacoes`)
                .then(res => {
                    setCurtidas(res.data.likes);
                    setComentarios(res.data.comments);
                });
            if (curtidas.length > 0) {
                for (let i = 0; i < curtidas.length; i++) {
                    const curtida_id_user = curtidas[i];
                    if (curtida_id_user._id == id_user) {
                        setUserLike(true);
                    }
                }
            }

            api.get(`user/${id_user}`)
                .then(res => {
                    setUser(res.data);
                })

            api.get(`post/${id}`)
                .then((res) => {
                    setPost(res.data);
                    setLoaded(true);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        loadPost();

    }, []);

    async function manageLike() {
        await api.put(`/post/addLike/${id}`, config)
            .then(() => {
                setUserLike(!userLike);
                api.get(`post/${id}/interacoes`)
                    .then(res => {
                        setCurtidas(res.data.likes);
                        setComentarios(res.data.comments);
                    })
            })
            .catch(err => console.log(err))
    }

    async function createComment() {
        const body = {
            texto: texto
        }
        await api.put(`post/addComment/${id}`, body)
            .then(() => {
                setTexto("");
                alert("Comentário adicionado!");
            })
    }

    return (
        <div className='container'>
            <div className='main'>
                {/* <h1>Feed Rede Social</h1> */}
                <div className='div-flex'>
                    <Social />
                    <div className='div-detalhes-post'>
                        {!loaded && <h4>Carregando post... <img src={loadingGIF} className="loading-gif" /></h4>}
                        {loaded &&
                            <div className='detalhe-post'>                         
                                <div className='post-header'>
                                    <Link to={`../perfil/${post.criador._id}`}>
                                        {post.criador.foto != "" ?
                                            <img src={post.criador.foto} alt="foto" className='img-user' />
                                            :
                                            <img src={avatar} alt="foto" className='img-user' />
                                        }
                                        <div>
                                            {post.criador != undefined ?
                                                <strong>{post.criador.nome}</strong>
                                                :
                                                <strong>-- Nome usuário</strong>
                                            }
                                            <p>{post.data.toString().split(" ")[0]} às {post.data.toString().split(" ")[1].slice(0, post.data.toString().split(" ")[1].length - 3)}</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className='post-content'>
                                    <p>{post.descricao}</p>
                                    {post.fotoPublicacao != "" &&
                                        <img src={post.fotoPublicacao} alt="foto publicação" className='img-post' />
                                    }
                                </div>
                                <div className='post-footer'>
                                    <div className='div-interacoes-post'>
                                        <div className='div-total-likes total-likes-post'>
                                            <Link to={`/detalhePost/${post._id}`}>
                                                <AiFillLike color="#727272" className='total-likes-icon' />
                                                {curtidas.length}
                                            </Link>
                                        </div>
                                        <div className='div-user-like'>
                                            {userLike ?
                                                <button onClick={manageLike}>
                                                    <AiFillLike color="#670067" className='user-like-icon' />
                                                    <p>retirar curtida</p>
                                                </button>
                                                :
                                                <button onClick={manageLike}>
                                                    <AiFillLike color="#727272" className='user-like-icon' />
                                                    <p>curtir</p>
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        }
                        <div className='div-comentarios'>
                            <div className='div-novo-comentario'>
                                <div className='div-textarea-post'>
                                    {user.foto != "" ?
                                        <img src={user.foto} className="img-user" />
                                        :
                                        <img src={avatar} className="img-user" />
                                    }
                                    <textarea placeholder={`Comente algo, ${user.nome}!`} value={texto}
                                        onChange={(e) => setTexto(e.target.value)} required />
                                </div>
                                <button onClick={createComment} className='comment-post-btn'>Comentar</button>
                            </div>

                            <div className='comentarios-post'>
                                <h3>Comentários da publicação</h3>
                                {loaded && comentarios[0] == undefined && <h4>Ainda não foi feito nenhum comentário</h4>}
                                {loaded && comentarios[0] != undefined && comentarios.map((c) => {
                                    var arrayDataHora = c.data.split(" "), data = arrayDataHora[0],
                                    hora = arrayDataHora[1], hora = hora.slice(0, hora.length - 3);
                                    return(
                                        <div key={c._id} className="div-comentario">
                                            <div className='comment-header'>
                                                {c.usuario.foto != '' ?
                                                    <img src={c.usuario.foto} alt="Avatar" className='img-user' />
                                                    :
                                                    <img src={avatar} alt="Avatar" className='img-user' />
                                                }
                                                <div>
                                                    <h4>{c.usuario.nome}</h4>
                                                    <h5>{data} às {hora}</h5>
                                                </div>
                                            </div>
                                            <p>{c.texto}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}