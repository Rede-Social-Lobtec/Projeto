import './style.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

// import Header from '../../components/Header';


function PerfilUser() {

    const [user, setUser] = useState([{}]);
    const [post, setPost] = useState([{}]);
    const [userUp, setUserUp] = useState([{}]);
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    var idUser = JSON.parse(localStorage.getItem('id'));
    var token = JSON.parse(localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {

        if (id != idUser) {
            navigate(`../perfil/${id}`);
        }
        async function loadUser() {
            await api.get(`user/${id}`)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadUser();

        async function loadPost() {

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await api.get(`postsUser/${id}`, config)
                .then((res) => {
                    setPost(res.data);
                })
        }
        loadPost();
    }, []);

    async function editUser(){
        var body = userUp
        const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

        await api.put(`user/${id}`, body, config)
        .then((res)=>{
            alert('Dados alterados');
        })
    }

    return (
        <div>
            {modalOpen && <Modal setOpenModal={setModalOpen} setUpUser={setUserUp}/>}
            <button onClick={editUser}>Salvar alteracoes</button>
            <h1>pagina usuario private</h1>
            {JSON.stringify(user)}
            <button
                className="openModalBtn"
                onClick={() => {
                    setModalOpen(true);
                }}
            >
                Editar
            </button>
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

export default PerfilUser;