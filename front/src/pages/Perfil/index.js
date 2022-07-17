// import './style.css';
// import { useEffect, useState} from 'react';
// import api from '../../services/api';
// import { useParams } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

// // import Header from '../../components/Header';


// function Perfil() {

//     const [post, setPost] = useState([{}]);
//     const { id } = useParams();
//     var token = JSON.parse(localStorage.getItem('token'));

//     useEffect(() => {
        
//         async function loadUser() {
//             await api.get(`user/${id}`)
//                 .then((res) => {
//                     setUser(res.data);
//                 })
//                 .catch((err)=>{
//                     console.log(err);
//                 })
//         }
//         loadUser();

//         async function loadPost(){

//             const config = {
//                 headers: { 
//                     Authorization: `Bearer ${token}` }
//             };
//             console.log(config);
//             console.log(id);
//             await api.get(`postsUser/${id}`, config)
//             .then((res)=>{
//                 setPost(res.data);
//                 console.log(res.data);
//             })
//         }
//         loadPost();
//     }, []);

//     return (
//         <div>
//         <h1>pagina usuario</h1>
//         {JSON.stringify(user)}

//         <h2>Posts</h2>
//         {JSON.stringify(post)}
        
//         <h2>Posts Lista</h2>
        
//         <div>
//             {post.map((p)=>{
//                 return(
//                     <div key={p.id}>
//                         <h3>{p.tema}</h3>
//                         <h5>{p.descricao}</h5>
//                     </div>
//                 )
//             })}
//         </div>
//         </div>
//     )
// }



import './stylePerfil.css';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../components/contexts/AuthContext';
import Header from '../../components/Header';
import DadosPerfil from '../../components/DadosPerfil';
import { CgSearch } from "react-icons/cg";
import api from '../../services/api';
import { AiFillLike, AiOutlineComment, AiFillStar, AiOutlineCloseCircle } from 'react-icons/ai';
import jwt_decode from 'jwt-decode';
const avatar = require('../../assets/no-photo.png');

function Perfil() {
    const [posts, setPosts] = useState([]);
    const [temaPost, setTemaPost] = useState('');
    const [curtidas, setCurtidas] = useState([]);
    const [user, setUser] = useState([{}]);

    const [post, setPost] = useState([{}]);
    const { id } = useParams();
    var token = JSON.parse(localStorage.getItem('token'));

    useEffect(() => {
        
        async function loadUser() {
            await api.get(`user/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err)=>{
                    console.log(err);
                })
        }
        loadUser();

        async function loadPost(){

            const config = {
                headers: { 
                    Authorization: `Bearer ${token}` }
            };
            console.log(config);
            console.log(id);
            await api.get(`postsUser/${id}`, config)
            .then((res)=>{
                setPost(res.data);
                console.log(res.data);
            })
        }
        loadPost();
    }, []);
    var token = JSON.parse(localStorage.getItem('token'));
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        function loadPosts() {
            api.get(`perfil`, config)
                .then((res) => {
                    setPosts(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadPosts();

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
        <div className='PFcontainer'>
                        <DadosPerfil/> 


                <div className='PFdiv-flex'>
                    <div className='PFdiv-perfil'>
                        <div className='PFdiv-actions'>
                            <div className='PFsearch-div'>
                            
                                {temaPost != '' && 
                                <button onClick={() => { setTemaPost(''); window.location.reload(); }}>
                                    <AiOutlineCloseCircle color="red" />
                                </button>
                                }
                            </div>
                            
                        </div>
                        <div className='PFdiv-posts'>
                            <ul>
                                {posts.length == 0 && <h3>O usuário ainda não possui publicação
                                    </h3>}
                                {loaded && posts.length > 0 && posts.map((p) => {
                                    var arrayDataHora = p.data.split(" ");
                                    var data = arrayDataHora[0];
                                    var hora = arrayDataHora[1];
                                    hora = hora.slice(0, hora.length - 3);
                                    // var curtiu = false;

                                    return (
             
                                        <li key={p._id} className="PFdiv-post">
                                            <div className='PFpost-header'>
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
                                            <div className='PFpost-content'>
                                                <p>{p.descricao}</p>
                                            </div>
                                            <div className='PFpost-footer'>
                                                <div className='PFdiv-interacoes-post'>
                                                    <div className='PFdiv-total-likes'>
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
                                                    <div className='PFdiv-post-comments'>
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
            <Header />
        </div>
    )
}

export default Perfil;