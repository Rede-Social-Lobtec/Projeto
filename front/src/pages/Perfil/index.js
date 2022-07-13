import './style.css';
import { useEffect, useState} from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// import Header from '../../components/Header';


function Perfil() {

    const [user, setUser] = useState([{}]);
    const [post, setPost] = useState([{}]);
    const { id } = useParams();


    useEffect(() => {
        
        var token = JSON.parse(localStorage.getItem('token'));
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
                    Authorization: `Bearer ${token.token}` }
            };
            console.log(config);
            await api.get(`postsUser/${id}`, config)
            .then((res)=>{
                setPost(res.data);
                console.log(res.data);
            })
        }
        loadPost();
    }, []);

    return (
        <div>
        <h1>pagina usuario</h1>
        {JSON.stringify(user)}
        <h2>Posts</h2>
        {JSON.stringify(post)}

        </div>
        // <div className='container'>
        //     <div className='content1'>
        //         <img src={require('../../assets/user-logo.png')} />
        //         <h2>{user}</h2>
        //     </div>
        //     <div className='content2'>
        //         <span>Departamento: {user.departamento}</span>
        //         <span>Cargo: {user.cargo}</span>
        //     </div>
        //     <div className='content3'>
        //         <ul>
        //             {user.seguindo.map((item) => {
        //                 return (
        //                     <li key={item._id}>
        //                         <div className='card'>
        //                             <div className='card-body'>
        //                                 <img src={require('../../assets/user-logo.png')} />
        //                                 <h2>seguindo1</h2>
        //                             </div>
        //                         </div>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </div>
        //     <div className='content4'>content4</div>
        //     <div className='content5'>content5</div>
        // </div>
    )
}

export default Perfil;