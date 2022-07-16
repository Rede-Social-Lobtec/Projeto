import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import Card from '../../components/Card';

function Pessoa() {

    const [pessoas, setPessoas] = useState([{}]);
    const [nomePessoa, setNomePessoa] = useState('');
    var token = JSON.parse(localStorage.getItem('token'));
    var id = JSON.parse(localStorage.getItem('id'));

    useEffect(() => {

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        async function loadPessoas() {

            await api.get(`users`, config)
                .then((res) => {
                    setPessoas(res.data);
                })
        }
        loadPessoas();

    }, []);

    async function pessoaByName() {
        await api.get(`users/${nomePessoa}`)
            .then((res) => {
                setPessoas(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async function seguirUser(id_user) {
        var body = { "id_user": id_user }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        await api.put(`user`, body, config)
            .then((res) => {
                alert('seguiu');
            })
    }

    return (
        <div>
            <h1>pagina pessoas</h1>
            <div >
                <input type="text" placeholder="Nome de uma pessoa" value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)} />
                <button onClick={pessoaByName}>Pesquisar</button>

            </div>
            <div className='pessoas-container'>
            <div className='list-container'>
                {pessoas.map((p) => {
                    if (p._id != id) {
                        return (
                            <div key={p._id}>
                                <Card nome={p.nome} cargo={p.cargo} email={p.email}/>
                                <Link to={`../perfil/${p._id}`}>Ver usuário</Link>
                                <button onClick={(e) => seguirUser(p._id)}>seguir</button>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
        </div>
    )
}

export default Pessoa;