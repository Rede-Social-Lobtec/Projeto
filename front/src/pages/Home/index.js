import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styleHome.css';
import nome from '../../assets/Animação_logo.gif';
import Header from '../../components/Header';


function Home() {
    // /*const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');*/

    function handleSubmit(e) {
        e.preventDefault();
        Auth();
    }

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token " + response.credential);
    }

    async function Auth() {

        var body = {email: '', senha: ''};
        await api.post('/auth', body)
        .then((res)=>{
          localStorage.setItem("token", res.data.token);
        })
    }

    


    return (
        <div className="Hcontainer-center">
            <div className="Hlogin">

                <div className="Hlogin-img">
                    <img src={nome} alt="HSistema nome" />
                    </div>
                    </div>

                <form onSubmit={handleSubmit} className="Hform-login">
                    <h1>Bem-Vindo(a) a nossa rede social corporativa</h1>
                    <Link to="/login"> Fazer Login </Link> 
                </form>

            
        </div>
    );
}

export default Home;





