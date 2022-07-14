import { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';

function Pessoa() {

    const [pessoas, setPessoas] = useState([{}]);
    const [nomePessoa, setNomePessoa] = useState('');

    useEffect(() => {

        var token = JSON.parse(localStorage.getItem('token'));

        async function loadPessoas(){

            const config = {
                headers: { 
                    Authorization: `Bearer ${token.token}` }
            };
            console.log(config);
            await api.get(`users`, config)
            .then((res)=>{
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

    return (
        <div>
            <h1>pagina pessoas</h1>
            {JSON.stringify(pessoas)}
            <div>
                <input type="text" placeholder="Nome de uma pessoa" value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)} />
                <button onClick={pessoaByName}>Pesquisar</button>
                {JSON.stringify(nomePessoa)}
            </div>
        </div>

    )
}

export default Pessoa;