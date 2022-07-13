import { useEffect, useState } from 'react';
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
            {JSON.stringify(grupos)}
            <div>
                <input type="text" placeholder="grupos" value={nomeGrupo} onChange={(e) => setNomeGrupo(e.target.value)} />
                <button onClick={groupByName}>Pesquisar</button>
                {JSON.stringify(nomeGrupo)}
            </div>
        </div>

    )
}

export default Grupo;