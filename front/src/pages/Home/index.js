import './style.css';
import {Link} from 'react-router-dom';

function Home(){
    return(
        <div>
            Página Home
            <Link to="/login">Login</Link>
        </div>
    )
}

export default Home;