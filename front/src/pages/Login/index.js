import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styleLog.css';
import logo from '../../image/yoda.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        Auth();
    }

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token " + response.credential);
    }

    async function Auth() {

        var body = {email: '', senha: ''};
        body.email = email;
        body.senha = password;
        await api.post('/auth', body)
        .then((res)=>{
          localStorage.setItem("token", res.data.token);
        })
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "1071739919355-q5dc6a00ad04laiual5dd9cg8bu9ocd0.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('signInDiv'),
            { theme: 'outline', size: 'large' }
        );
    }, [])

    return (
        <div className="container-center">
            <div className="login">
                <div className="login-img">
                    <img src={logo} alt="Sistema Logo" />
                </div>

                <form onSubmit={handleSubmit} className="form-login">
                    <h1>O login fazer você deve</h1>
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Link to="/feed"> Entrar </Link>
                </form>

                <hr className='divisor' />

                <h4>Ou, se preferir </h4>
                
                <div id="signInDiv"></div>

            </div>
        </div>
    );
}

export default Login;
