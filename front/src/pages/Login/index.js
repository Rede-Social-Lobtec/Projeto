import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styleLog.css';
import logo from '../../image/yoda.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault();
    alert('CLICOU')
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
        <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>O login fazer você deve</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
          <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
          <Link to="/feed"> Entrar </Link>
        </form>  

      </div>
    </div>
  );
}

export default Login;







