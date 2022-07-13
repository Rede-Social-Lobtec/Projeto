import './style.css';
import { useContext } from 'react';
import {Context} from '../../components/contexts/AuthContext';

function Feed(){
    const {handleLogout} = useContext(Context);
    return(
        <div>
            Página de Feed
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default Feed;