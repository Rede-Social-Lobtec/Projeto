import './detalhe-post.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../contexts/AuthContext';
import Header from '../Header';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai';

const avatar = require('../../assets/no-photo.png');

export default function DetalhePost() {
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
                })
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

    function createPost() {
      api.post('post')
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
                    <div className='detalhe-post'>
                        
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}