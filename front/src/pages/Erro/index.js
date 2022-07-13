import {Link} from 'react-router-dom';
import './style.css';

function Erro(){
    return(
        <div className="not-found">
            <h1>404</h1>
            <h2>Página não encontrada!</h2>
            <br/>
            <Link to='/feed'>Voltar</Link>
        </div>
    )
}

export default Erro;