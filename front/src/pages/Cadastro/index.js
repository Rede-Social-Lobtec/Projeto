import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styleCad.css';
import logo from '../../image/luke.jpg';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [departametno, setDepartament] = useState('');
  const [cargo, setCargo] = useState('');
  const [data_nascimento, setNascimento] = useState('');
  const [telefone, setTelfone] = useState('');
  const [foto, setFoto] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    alert('CLICOU')
  }

  return (
    <div className="Cadcontainer-center">
      <div className="Cadlogin">
        <div className="Cadlogin-area">
          <img src={logo} alt="CadSistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Faça o cadastro e venha para o lado bom da força</h1>
          <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
          <input type="int" placeholder="departametno" value={departametno} onChange={ (e) => setDepartament(e.target.value) }/>
          <input type="text" placeholder="cargo" value={cargo} onChange={ (e) => setCargo(e.target.value) }/>
          <input type="text" placeholder="Data de Nascimento" value={data_nascimento} onChange={ (e) => setNascimento(e.target.value) }/>
          <input type="text" placeholder="telefone" value={telefone} onChange={ (e) => setTelfone(e.target.value) }/>
          <input type="text" placeholder="foto" value={foto} onChange={ (e) => setFoto(e.target.value) }/>

          <button type="submit">Cadastrar</button>
        </form>  

        <Link to="/login">Já tem uma conta? Entre</Link>
      </div>
    </div>
  );
}

export default Cadastro;
























