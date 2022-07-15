import React, {useState} from "react";
import "./modal.css";

function Modal({ setOpenModal, setUpUser}) {

    const [nome, setNome] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [departamento, setDepartament] = useState(null);
    const [cargo, setCargo] = useState(null);
    const [data_nascimento, setNascimento] = useState(null);
    const [telefone, setTelfone] = useState(null);
    
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            nome: nome,
            email: email,
            password: password,
            departametno: departamento,
            cargo: cargo,
            data_nascimento: data_nascimento,
            tefelfone: telefone
        }
        setOpenModal(false);
        setUpUser(data);
    }
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="header">
                    <h1>Editar Perfil</h1>
                    <button onClick={() => {setOpenModal(false);}}>X</button>
                    </div>
                    <form onSubmit={handleSubmit} className='form'>
                        <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type="int" placeholder="Departamento" value={departamento} onChange={(e) => setDepartament(e.target.value)} />
                        <input type="text" placeholder="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
                        <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={(e) => setNascimento(e.target.value)} />
                        <input type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelfone(e.target.value)} />
                    </form>
                <button className="salvar" type="submit" onClick={handleSubmit}>Salvar</button>
            </div>
        </div>
    );
}

export default Modal;