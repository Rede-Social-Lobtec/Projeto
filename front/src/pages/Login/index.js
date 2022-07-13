import { useState, useEffect, useContext } from 'react';
import {Context} from '../../components/contexts/AuthContext';
import './styleLog.css';

function Login() {
    const {authenticated, handleLogin, loginToken} = useContext(Context);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(email, password);
    }

    function handleCallbackResponse(response) {
        loginToken(response.credential);
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
                <form onSubmit={handleSubmit} className="form-login">
                    <h1>O login fazer você deve</h1>
                    <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Acessar</button>
                </form>

                <hr className='divisor' />

                <h4>Ou, se preferir </h4>
                
                <div id="signInDiv"></div>

            </div>
        </div>
    );
}

export default Login;
