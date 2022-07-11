import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Feed from '../pages/Feed';
import Perfil from '../pages/Perfil';
import Grupo from '../pages/Grupo';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
                <Route path="/grupo" element={<Grupo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;