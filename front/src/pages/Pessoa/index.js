import { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css';
import Card from '../../components/Card';
import { CgSearch } from "react-icons/cg";
import Header from '../../components/Header';

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

    return (
        <div className='all'>
            <div className='conteudo'>
                <div className='pessoas-header'>
                    <h1>pagina pessoas</h1>
                    <div className='pesquisa'>
                        <input type="text" placeholder='Buscar por nome'
                            value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)} />
                        <button onClick={pessoaByName} className='search-btn'>
                            <CgSearch size={25} color='#888' />
                        </button>
                    </div>
                </div>
                <div className='pessoas-container'>
                    <div className='list-container'>
                        {pessoas.map((p) => {
                            if (p._id != id) {
                                return (
                                    <div key={p._id}>
                                        <Card id={p._id} nome={p.nome} foto={p.foto} cargo={p.cargo} email={p.email}/>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            <Header />
        </div>
    )
}

export default Pessoa;