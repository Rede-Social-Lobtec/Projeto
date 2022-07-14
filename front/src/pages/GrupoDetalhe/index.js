import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// import Header from '../../components/Header';


function GrupoDetalhe() {

    const [grupo, setGrupo] = useState([{}]);
    const [post, setPost] = useState([{}]);
    var token = JSON.parse(localStorage.getItem('token'));
    const { id } = useParams();


    useEffect(() => {

        var token = JSON.parse(localStorage.getItem('token'));
        async function loadGrupo() {
            await api.get(`group/${id}`)
                .then((res) => {
                    setGrupo(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadGrupo();

        async function loadPost() {

            const config = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            };
            await api.get(`group/${id}/posts`, config)
                .then((res) => {
                    setPost(res.data);
                })
        }
        loadPost();
    }, []);

    return (
        <div>
            <h1>Página Grupo detalhe</h1>
            {JSON.stringify(grupo)}
            <h2>Posts</h2>
            {JSON.stringify(post)}
            {/* <ul>
                {post.map((p) => {
                    return (
                        <li key={p.id}>
                            <strong>{p.tema}</strong>
                            <p>{p.descricao}</p>
                        </li>
                    )
                })}
            </ul> */}
        </div>
    )
}

export default GrupoDetalhe;