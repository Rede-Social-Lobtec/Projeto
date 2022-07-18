import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './grupo.css';
import CardGrupo from '../../components/CardGrupo';
import { CgSearch } from "react-icons/cg";
import Header from '../../components/Header';

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
        <div className='all-grupos'>
            <div className='conteudo-grupos'>
                <div className='grupos-header'>
                    <h1>Página de grupos</h1>
                    <div className='pesquisa'>
                        <input type="text" placeholder='Buscar por nome'
                            value={nomeGrupo} onChange={(e) => setNomeGrupo(e.target.value)} />
                        <button onClick={groupByName}>
                            <CgSearch size={25} color='#888' />
                        </button>
                    </div>
                </div>
                <div className='grupos-container'>
                    <div className='list-grupos'>
                        {grupos.map((g) => {
                            return (
                                <div key={g._id}>
                                    <CardGrupo id_adm={g.id_adm} id={g._id} nome={g.nome} descricao={g.descricao} seguidores={g.seguidores} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Header />
        </div>

    )
}

export default Grupo;