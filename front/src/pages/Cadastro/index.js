import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styleCad.css';
import logo from '../../assets/icons/sorriso_laranja.png';

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e){
    e.preventDefault();
    alert('CLICOU')
  }

  return (
    <div className="Cadcontainer-center">
    <div className="Cadlogin">

        <div className="Cadlogin-img">
            <img src={logo} alt="CadSistema nome" />
            </div>
            </div>


        <form className="Cadform-login" onSubmit={handleSubmit}>
          <h1>Cadastro novo usuário</h1>
          <input type="text" placeholder="Nome do novo usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />


          <button type="submit">Cadastrar</button>
        </form>  

        {/* <Link to="/login">Já tem uma conta? Entre</Link> */}
      {/* </div> */}
    </div>
  );
}

export default Cadastro;
























