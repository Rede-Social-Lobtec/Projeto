import { useEffect, useState } from 'react';
import { Link, renderMatches, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Pessoa() {

    const [pessoas, setPessoas] = useState([{}]);
    const [nomePessoa, setNomePessoa] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        var token = JSON.parse(localStorage.getItem('token'));

        async function loadPessoas() {

            const config = {
                headers: {
                    Authorization: `Bearer ${token.token}`
                }
            };
            console.log(config);
            await api.get(`users`, config)
                .then((res) => {
                    setPessoas(res.data);
                    console.log(res.data);
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

    function pessoaDetalhe(id) {
        navigate(`perfil/${id}`, { replace: true })
    }

    return (
        <div>
            <h1>pagina pessoas</h1>
            <div>
                <input type="text" placeholder="Nome de uma pessoa" value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)} />
                <button onClick={pessoaByName}>Pesquisar</button>
            </div>
            <ul>
                {pessoas.map((p) => {
                    return (
                        <li key={p.id}>
                            <strong>{p.nome}</strong>
                            <p>{p.departamento}</p>
                            <Link to={`../perfil/${p._id}`}>Ver usuário</Link>
                        </li>
                    )
                })}
            </ul>           
        </div>
    )
}

export default Pessoa;