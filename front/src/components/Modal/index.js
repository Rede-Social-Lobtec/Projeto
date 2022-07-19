import React, {useState} from "react";
import "./modal.css";
import api from '../../services/api';

function Modal({setOpenModal}) {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [departamento, setDepartament] = useState("");
    const [cargo, setCargo] = useState("");
    const [data, setData] = useState("");
    const [telefone, setTelfone] = useState("");

    var token = JSON.parse(localStorage.getItem('token'));
    var idUser = JSON.parse(localStorage.getItem('id'));

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    
    function handleSubmit(e) {
        e.preventDefault();
        setOpenModal(false);
        updateUser();
    }
    async function updateUser(){

        var date = data.split('-');
        var dia = date[2];
        var mes = date[1];
        var ano = date[0];
        var novaData = `${dia}/${mes}/${ano}`;

        var body = {
            nome: nome,
            email: email,
            password: password,
            departamento: departamento,
            cargo: cargo,
            data_nascimento: novaData,
            telefone: telefone
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
            bodyTeste.senha = body.password
        }
        await api.put(`user/${idUser}`, bodyTeste, config)
            .then(() => {
                alert('Informações atualizadas');
            })
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="header">
                    <h1>Editar Perfil</h1>
                    <button onClick={() => {setOpenModal(false)}}>X</button>
                    </div>
                    <form onSubmit={handleSubmit} className='form'>
                        <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="int" placeholder="Departamento" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                        <input type="date" placeholder="Data de Nascimento" value={data} onChange={(e) => setData(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                    </form>
                <button className="salvar" type="submit" onClick={handleSubmit}>Salvar</button>
            </div>
        </div>
    );
}

export default Modal;