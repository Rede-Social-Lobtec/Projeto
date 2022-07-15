import './style.css';
import { useEffect, useState} from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';

// import Header from '../../components/Header';

function Perfil() {

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

    return (
        <div>
        <h1>pagina usuario</h1>
        {JSON.stringify(user)}
        <h2>Posts</h2>
        {JSON.stringify(post)}
        <h2>Posts Lista</h2>
        <div>
            {post.map((p)=>{
                return(
                    <div key={p.id}>
                        <h3>{p.tema}</h3>
                        <h5>{p.descricao}</h5>                      
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Perfil;