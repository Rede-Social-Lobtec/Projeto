import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './style.css';

function Grupo() {

    const [grupos, setGrupos] = useState([{}]);
    const [nomeGrupo, setNomeGrupo] = useState('');

    useEffect(() => {

        async function loadGroup() {
            await api.get(`groups`)
                .then((res) => {
                    setGrupos(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        loadGroup();

    }, []);

    async function groupByName() {
        await api.get(`groups/${nomeGrupo}`)
            .then((res) => {
                setGrupos(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <h1>pagina grupos</h1>
            <div>
                <input type="text" placeholder="nome do grupo" value={nomeGrupo} onChange={(e) => setNomeGrupo(e.target.value)} />
                <button onClick={groupByName}>Pesquisar</button>
            </div>
            <ul>
                {grupos.map((g) => {
                    return (
                        <li key={g.id}>
                            <strong>{g.nome}</strong>
                            <p>{g.descricao}</p>
                            <Link to={`/grupo/${g._id}`}>Ver grupo</Link>
                        </li>
                    )
                })}
            </ul>
        </div>

    )
}

export default Grupo;