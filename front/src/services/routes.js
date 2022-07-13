import { Routes, Route, useNavigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Feed from '../pages/Feed';
import Perfil from '../pages/Perfil';
import Grupo from '../pages/Grupo';
import Erro from '../pages/Erro';

function RoutesApp() {

    const navigate = useNavigate();
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route element={<PrivateRoute />}>
                <Route path="/feed" element={<Feed/>} />
                <Route path="/perfil/:id" element={<Perfil />} />
                <Route path="/grupo" element={<Grupo />} />
            </Route>
            <Route path="*" element={<Erro />} />
        </Routes>
    )
}

export default RoutesApp;