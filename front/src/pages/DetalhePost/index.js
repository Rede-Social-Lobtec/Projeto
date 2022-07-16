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

export default function DetalhePost() {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [post, setPost] = useState({});
    const [arrayDataHora, setArrayDataHora] = useState([]);
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");

    var token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        function loadPost() {
            api.get(`post/${id}`)
                .then((res) => {
                    setPost(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        loadPost();

        function loadInteractions() {
            api.get(`/post/${id}/interacoes`)
                .then((res) => {
                    console.log(res.data);
                    // setCurtidas(res.data.likes);
                    // setComentarios(res.data.comments);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadInteractions();

        setLoaded(true);
    }, []);

    return (
        <div className='container'>
            <div className='main'>
                {/* <h1>Feed Rede Social</h1> */}
                <div className='container'>
                    <Social />
                    <div className='div-detalhes-post'>
                    {loaded &&
                        <div className='detalhe-post'>                         
                            <div className='post-header'>
                                <Link to={`../perfil/${post.criador._id}`}>
                                    {post.criador.foto != undefined ?
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
                                {post.fotoPublicacao != undefined &&
                                    <img src={post.fotoPublicacao} alt="foto publicação" className='img-post' />
                                }
                            </div>
                            <div className='post-footer'>
                                <div className='div-interacoes-post'>
                                    <div className='div-total-likes'>
                                        <Link to={`/detalhePost/${post._id}`}>
                                            <AiFillLike color="#727272" className='total-likes-icon' />
                                            {post.curtidaDetalhe.length}
                                        </Link>
                                    </div>
                                    {/* {curtiu = UserLike(p._id, curtiu)}
                                    {curtiu == true &&
                                        <div className='div-user-like'>
                                            <AiFillLike color="#670067" className='user-like-icon' />
                                            <p>retirar curtida</p>
                                        </div>
                                    } */}
                                    <div className='div-post-comments'>
                                        <Link to={`/detalhePost/${post._id}`}>
                                            <p>ver comentários</p>
                                            <AiOutlineComment color="#727272" className='post-comments-icon' />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    }
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}