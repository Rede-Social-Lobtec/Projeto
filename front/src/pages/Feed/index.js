import './style.css';
import { useContext } from 'react';
import {Context} from '../../components/contexts/AuthContext';
import Header from '../../components/Header';

function Feed(){
    const {handleLogout} = useContext(Context);
    return(
        <div className='container'>
            <div className='main'>
                <div >

                </div>
            </div>
            {/* <button onClick={handleLogout}>LogOut</button> */}
            <Header />
        </div>
    )
}

export default Feed;