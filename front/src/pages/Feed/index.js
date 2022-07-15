import './feed.css';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment } from 'react-icons/ai';

const avatar = require('../../assets/no-photo.png');

function Feed() {
    const { handleLogout } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    var token = JSON.parse(localStorage.getItem('token'));
    var id = JSON.parse(localStorage.getItem('id'));
    const [loaded, setLoaded] = useState(false);
    
    // VER PQ TÁ RODANDO DUAS VEZES 
    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        async function loadPosts() {

            await api.get(`feed`, config)
                .then((res) => {
                    setPosts(res.data.feed);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        loadPosts();

        setLoaded(true);
    }, []);

    return (
        <div className='container'>
            <div className='main'>
                <h1>Feed Rede Social</h1>
                <div className='div-flex'>
                    <div className='div-social'>
                        <div className='div-column'>
                            <p>Pessoas que você segue</p>
                            <div className='people-followed'>

                            </div>
                        </div>
                        <div className='div-column'>
                            <p>Grupos que você faz parte</p>
                            <div className='groups-user'>

                            </div>
                        </div>
                    </div>
                    <div className='div-feed'>
                        <div className='div-actions'>
                            <form className='search-form'>
                                <input className='input-theme' />
                                <button className='search-btn' type='submit'>
                                    <CgSearch size={25} color='#727272' />
                                </button>
                            </form>
                            <button>Criar post</button>
                        </div>
                        <div className='div-posts'>
                            <ul>
                                {posts.length == 0 && <h3>Ainda não temos nenhuma publicação!</h3>}
                                {loaded && posts.length > 0 && posts.map((p) => {
                                    return (
                                        <li key={p._id}>
                                            <div className='post-header'>
                                                <img src={avatar} alt="avatar" className='post-img-user' />
                                                <div>
                                                    {p.criador != undefined ?
                                                        <strong>{p.criador.nome}</strong>
                                                        :
                                                        <strong>-- Nome usuário</strong>
                                                    }
                                                    <p>{p.data} às {p.hora}</p>
                                                </div>
                                            </div>
                                            <div className='post-content'>
                                                <p>{p.descricao}</p>
                                            </div>
                                            <div className='post-footer'>
                                                <div className='div-total-likes'>
                                                    <AiFillLike color="#727272" className='total-likes-icon' />
                                                    {p.curtidaDetalhe.length}
                                                </div>
                                                <hr/>
                                                <div className='div-interacoes-post'>
                                                    <div className='div-user-like'>
                                                        <AiFillLike  color="#670067" className='user-like-icon' />
                                                        <p>retirar curtida</p>
                                                    </div>
                                                    <div className='div-post-comments'>
                                                        <p>ver comentários</p>
                                                        <AiOutlineComment color="#727272" className='post-comments-icon' />
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