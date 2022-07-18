import './feed.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Social from '../../components/Social';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, 
    AiOutlineCloseCircle } from 'react-icons/ai';

const avatar = require('../../assets/no-photo.png');

function Feed() {
    const [posts, setPosts] = useState([]);
    const [temaPost, setTemaPost] = useState('');

    var token = JSON.parse(localStorage.getItem('token'));
    var id = JSON.parse(localStorage.getItem('id'));
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        function loadPosts() {
            api.get(`feed`, config)
                .then((res) => {
                    setPosts(res.data);
                    setLoaded(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadPosts();

    }, []);

    async function postByTheme() {
        if (temaPost == "") window.location.reload();
        var response = await api.get(`posts/${temaPost}`);
        console.log(typeof(temaPost));
        setPosts(response.data);
    }

    return (
        <div className='container'>
            <div className='main'>
                <div className='div-flex'>
                    <Social /> 
                    <div className='div-feed'>
                        <div className='div-actions'>
                            <div className='search-div'>
                                <div className='input-div'>
                                    <input className='input-theme' type="text" placeholder='Buscar post por tema' 
                                        value={temaPost} onChange={(e) => setTemaPost(e.target.value)} />
                                    <button onClick={postByTheme} className='search-btn'>
                                        <CgSearch size={25} color='#888' />
                                    </button>
                                </div>
                                {temaPost != '' && 
                                <button onClick={() => { setTemaPost(''); window.location.reload(); }}>
                                    <AiOutlineCloseCircle color="red" />
                                </button>
                                }
                            </div>
                            <Link to="/cadastroPost" className='link-create-post'>Criar post</Link>
                        </div>
                        <div className='div-posts'>
                            <ul>
                                {!loaded && <h3>Carregando feed...</h3>}
                                {loaded && posts.length == 0 && <h3>Ainda não temos nenhuma publicação!</h3>}
                                {loaded && posts.length > 0 && posts.map((p) => {
                                    var arrayDataHora = p.data.split(" ");
                                    var data = arrayDataHora[0];
                                    var hora = arrayDataHora[1];
                                    hora = hora.slice(0, hora.length - 3);

                                    return (
                                        <li key={p._id} className="div-post">
                                            <div className='post-header'>
                                                <Link to={`../perfil/${p.criador._id}`}>
                                                    {p.criador.foto != undefined ?
                                                        <img src={p.criador.foto} alt="foto" className='img-user' />
                                                        :
                                                        <img src={avatar} alt="foto" className='img-user' />
                                                    }
                                                    <div>
                                                        {p.criador != undefined ?
                                                            <strong>{p.criador.nome}</strong>
                                                            :
                                                            <strong>-- Nome usuário</strong>
                                                        }
                                                        <p>{data} às {hora}</p>
                                                    </div>
                                                </Link>
                                                {p.criador.admin && <AiFillStar color="#670067" /> }
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
                </div>
            </div>
            <Header />
        </div>
    )
}

export default Feed;