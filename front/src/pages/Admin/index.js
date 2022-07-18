import { useEffect, useState } from 'react';
import api from '../../services/api';
import './admin.css';

// import Header from '../../components/Header';


function Admin() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [departamento, setDepartament] = useState("");
    const [cargo, setCargo] = useState("");
    const [data_nascimento, setNascimento] = useState("");
    const [telefone, setTelfone] = useState("");
    const [adminBool, setAdminBool] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [logsOpen, setLogsOpen] = useState(false);
    const [logsRes, setLogsRes] = useState(null);
    const [temaOpen, setTemaOpen] = useState(false);
    const [temaRes, setTemaRes] = useState(null);
    const [data, setData] = useState('');
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    var token = JSON.parse(localStorage.getItem('token'));

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, [])

    function handleCreate(e) {
        e.preventDefault();
        setFormOpen(false);
        createUser();
    }

    function handleUpdate(e) {
        e.preventDefault();
        setUpdateOpen(false);
        updateUser();
    }

    function handleDelete(e) {
        e.preventDefault();
        setDeleteOpen(false);
        deleteUser();
    }

    function handleLogs(e) {
        e.preventDefault();
        logSearch();
    }

    function handleTema(e) {
        e.preventDefault();
        temaSearch();
    }

    async function createUser() {
        var body = {
            nome: nome,
            departamento: departamento,
            cargo: cargo,
            email: email,
            data_nascimento: data_nascimento,
            telefone: telefone,
            senha: password,
            admin: adminBool
        }

        await api.post(`user`, body)
            .then(() => {
                alert('Usuário criado');
            })
    }

    async function updateUser() {
        var body = {
            nome: nome,
            departamento: departamento,
            cargo: cargo,
            email: email,
            data_nascimento: data_nascimento,
            telefone: telefone,
            senha: password,
            admin: adminBool
        }
        var bodyTeste = {}
        if (body.nome !== "") {
            bodyTeste.nome = body.nome
        }
        if (body.departamento !== "") {
            bodyTeste.departamento = body.departamento
        }
        if (body.cargo !== "") {
            bodyTeste.cargo = body.cargo
        }
        if (body.email !== "") {
            bodyTeste.email = body.email
        }
        if (body.data_nascimento !== "") {
            bodyTeste.data_nascimento = body.data_nascimento
        }
        if (body.telefone !== "") {
            bodyTeste.telefone = body.telefone
        }
        if (body.senha !== "") {
            bodyTeste.senha = body.senha
        }
        bodyTeste.admin = body.admin;
        await api.put(`user/${userId}`, bodyTeste, config)
            .then(() => {
                alert('Usuário atualizado');
            })
    }

    async function deleteUser() {
        await api.delete(`user/${userId}`, config)
            .then(() => {
                alert('Usuário deletado');
            })
    }

    async function logSearch() {
        var date = data.split('-');
        var dia = date[2];
        var mes = date[1];
        var ano = date[0];
        var novaData = `${dia}/${mes}/${ano}`;
        var body = {
            id_user: userId,
            data: novaData
        }
        await api.post(`logs`, body, config)
            .then((res) => {
                setLogsRes(res.data);
            })
    }

    async function temaSearch() {
        await api.get(`tema`)
            .then((res) => {
                setTemaRes(res.data);
                console.log(res.data);
            })
    }


    return (
        <div>
            {isLoading && <p>Loading...</p>}
            <div className='admin-page'>
                <div className='nav-bar'>
                    <h1>Página do administrador</h1>
                    <img src={require('../../assets/logo.png')}></img>
                </div>
                <div className='crud'>
                    <h4>CRUD Usuário</h4>
                    <div className='card-create'>
                        <button className='toggle' onClick={() => setFormOpen(!formOpen)}>Criar usuário</button>
                        <div className={formOpen ? "content show" : "content"}>
                            <form onSubmit={handleCreate} className='admin-form'>
                                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder="Departametno" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                                <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                                <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={(e) => setNascimento(e.target.value)} />
                                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                                <label className='admin-bool'>Usuário é administrador?
                                    <input type='checkbox' value={adminBool} onChange={(e) => setAdminBool(true)}></input>
                                </label>
                            </form>
                            <button className='form-button' type="submit" onClick={handleCreate}>Salvar</button>
                        </div>
                    </div>
                    <div className='card-update'>
                        <button className='toggle-update' onClick={() => setUpdateOpen(!updateOpen)}>Atualizar usuário</button>
                        <div className={updateOpen ? "update show" : "update"}>
                            <form onSubmit={handleUpdate} className='update-form'>
                                <input type="text" placeholder="ID do usuário" value={userId} onChange={(e) => setUserId(e.target.value)} />
                                <input type="text" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder="Departametno" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                                <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                                <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={(e) => setNascimento(e.target.value)} />
                                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                                <label className='update-bool'>Usuário é administrador?
                                    <input type='checkbox' value={adminBool} onChange={(e) => setAdminBool(true)}></input>
                                </label>
                            </form>
                            <button className='update-button' type="submit" onClick={handleUpdate}>Salvar</button>
                        </div>
                    </div>
                    <div className='card-delete'>
                        <button className='toggle-delete' onClick={() => setDeleteOpen(!deleteOpen)}>Deletar usuário</button>
                        <div className={deleteOpen ? "delete show" : "delete"}>
                            <input type='text' placeholder='id do usuario' value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                            <button className='delete-button' type="submit" onClick={handleDelete}>Salvar</button>
                        </div>
                    </div>
                </div>
                <div className='crud-grupo'>
                    <h4>CRUD Grupo</h4>
                    <div className='card-create'>
                        <button className='toggle' onClick={() => setFormOpen(!formOpen)}>Criar grupo</button>
                        <div className={formOpen ? "content show" : "content"}>
                            <form onSubmit={handleCreate} className='admin-form'>
                                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder="Departametno" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                                <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                                <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={(e) => setNascimento(e.target.value)} />
                                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                                <label className='admin-bool'>Usuário é administrador?
                                    <input type='checkbox' value={adminBool} onChange={(e) => setAdminBool(true)}></input>
                                </label>
                            </form>
                            <button className='form-button' type="submit" onClick={handleCreate}>Salvar</button>
                        </div>
                    </div>
                    <div className='card-update'>
                        <button className='toggle-update' onClick={() => setUpdateOpen(!updateOpen)}>Atualizar grupo</button>
                        <div className={updateOpen ? "update show" : "update"}>
                            <form onSubmit={handleUpdate} className='update-form'>
                                <input type="text" placeholder="ID do usuário" value={userId} onChange={(e) => setUserId(e.target.value)} />
                                <input type="text" placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="text" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder="Departametno" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                                <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                                <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={(e) => setNascimento(e.target.value)} />
                                <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                                <label className='update-bool'>Usuário é administrador?
                                    <input type='checkbox' value={adminBool} onChange={(e) => setAdminBool(true)}></input>
                                </label>
                            </form>
                            <button className='update-button' type="submit" onClick={handleUpdate}>Salvar</button>
                        </div>
                    </div>
                    <div className='card-delete'>
                        <button className='toggle-delete' onClick={() => setDeleteOpen(!deleteOpen)}>Deletar grupo</button>
                        <div className={deleteOpen ? "delete show" : "delete"}>
                            <input type='text' placeholder='id do usuario' value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                            <button className='delete-button' type="submit" onClick={handleDelete}>Salvar</button>
                        </div>
                    </div>
                </div>
                <div className='desafios'>
                <h4>Pesquisas</h4>
                    <div className='card-logs'>
                        <button className='toggle-logs' onClick={() => setLogsOpen(!logsOpen)}>Pesquisar entradas do usuário</button>
                        <div className={logsOpen ? "logs show" : "logs"}>
                            <input type='text' placeholder='id do usuario' value={userId} onChange={(e) => setUserId(e.target.value)}></input>
                            <input type='date' placeholder='data' value={data} onChange={(e) => setData(e.target.value)}></input>
                            <div className='log-res'>
                                <button className='logs-button' type="submit" onClick={handleLogs}>Pesquisar</button>
                                {logsRes && <p>Numero de entrada para este usuário: {logsRes}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='card-tema'>
                        <button className='toggle-tema' onClick={() => setTemaOpen(!temaOpen)}>Pesquisar tema com mais interações</button>
                        <div className={temaOpen ? "tema show" : "tema"}>
                            <p className='guide'>Interações = Curtidas + Comentários</p>
                            <div className='tema-res'>
                                <button className='tema-button' type="submit" onClick={handleTema}>Pesquisar</button>
                                {temaRes && <p>{temaRes.msg}</p>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Admin;