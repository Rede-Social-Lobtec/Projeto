import './feed.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai';

const avatar = require('../../assets/no-photo.png');

function Feed() {
    const { handleLogout } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [following, setFollowing] = useState([]);
    const [temaPost, setTemaPost] = useState('');
    const [curtidas, setCurtidas] = useState([]);

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
                    setPosts(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadPosts();

        function loadSocialInfo() {
            api.get('user', config)
                .then((res) => {
                    setGroups(res.data.grupos)
                    setFollowing(res.data.seguindo);
                })
                .catch(err => {
                    console.log(err);
                });
            
        }
        loadSocialInfo();

        setLoaded(true);
    }, []);

    async function postByTheme() {
        if (temaPost == "") window.location.reload();
        var response = await api.get(`posts/${temaPost}`);
        console.log(typeof(temaPost));
        setPosts(response.data);
    }

    // function UserLike(id_post, curtiu) {
    //     var curtidas = api.get(`posts/getLikes/${id_post}`);
    //     for (let i = 0; i < curtidas.length; i++) {
    //         const id_user = curtidas[i];
    //         console.log(`${i} id user: ${id_user}`);
    //         var user = api.get(`user/${id_user}`);
    //         console.log(`${user[0]}`);
    //         if(user[0] != undefined) { 
    //             console.log("mudou pra true");
    //             curtiu = true;
    //         };
    //     }
    //     return curtiu;
    // }

    return (
        <div className='container'>
            <div className='main'>
                {/* <h1>Feed Rede Social</h1> */}
                <div className='div-flex'>
                    <div className='div-social'>
                        <div className='div-column'>
                            <h5>Pessoas que você segue</h5>
                            <div className='people-followed'>
                                <ul>
                                {loaded && following.length > 0 && following.map((u) => {
                                    return(
                                        <li key={u._id}>
                                            <div className='person-followed'>
                                                <Link to={`../perfil/${u._id}`}>
                                                    <img src={avatar} alt="Avatar" className='img-user' />
                                                    <p>{u.nome}</p>
                                                </Link>   

                                            </div>
                                        </li>
                                    )
                                })}
                                </ul>
                            </div>
                        </div>
                        <div className='div-column'>
                            <h5>Grupos que você faz parte</h5>
                            <div className='groups-user'>
                                {loaded && groups.length > 0 && groups.map((g) => {
                                    return(
                                        <li key={g._id}>
                                            <div className='group-user'>
                                                <Link to={`../grupo/${g._id}`}>
                                                    <p>{g.nome}</p>
                                                </Link> 

                                            </div>
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
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
                                {posts.length == 0 && <h3>Ainda não temos nenhuma publicação!</h3>}
                                {loaded && posts.length > 0 && posts.map((p) => {
                                    var arrayDataHora = p.data.split(" ");
                                    var data = arrayDataHora[0];
                                    var hora = arrayDataHora[1];
                                    hora = hora.slice(0, hora.length - 3);
                                    // var curtiu = false;

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
                                                    {/* {curtiu = UserLike(p._id, curtiu)}
                                                    {curtiu == true &&
                                                        <div className='div-user-like'>
                                                            <AiFillLike color="#670067" className='user-like-icon' />
                                                            <p>retirar curtida</p>
                                                        </div>
                                                    } */}
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