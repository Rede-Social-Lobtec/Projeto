import './create-post.css';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai';
import Social from '../../components/Social';

const avatar = require('../../assets/no-photo.png');

export default function CadastroPost() {
    const { handleLogout } = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [following, setFollowing] = useState([]);
    const [temaPost, setTemaPost] = useState('');
    const [curtidas, setCurtidas] = useState([]);

    var token = JSON.parse(localStorage.getItem('token'));
    var id = JSON.parse(localStorage.getItem('id'));
    const [loaded, setLoaded] = useState(false);
    
    // useEffect(() => {
        
    //     async function loadUsers() {
    //         await api.get('users')
    //     }
    //     loadUsers();
    // }, []);


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
                    <Social />
                    <div className='div-create-post'>
                        <form className='form-post' action={createPost}>
                            <div>
                                <div>
                                    
                                    
                                </div>
                                <div>

                                </div>
                            </div>
                            <button type='submit'>Publicar</button>
                        </form>
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}