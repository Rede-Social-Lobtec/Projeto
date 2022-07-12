import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Feed from '../pages/Feed';
import Perfil from '../pages/Perfil';
import Grupo from '../pages/Grupo';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/perfil/:id" element={<Perfil/>}/>
                <Route path="/grupo" element={<Grupo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;