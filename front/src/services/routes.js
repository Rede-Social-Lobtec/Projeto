import { Routes, Route, useNavigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Feed from '../pages/Feed';
import Perfil from '../pages/Perfil';
import Pessoa from '../pages/Pessoa';
import Grupo from '../pages/Grupo';
import Erro from '../pages/Erro';
import DetalhePost from '../pages/DetalhePost';
import GrupoDetalhe from '../pages/GrupoDetalhe';
import CadastroPost from '../pages/CadastroPost';
import Admin from '../pages/Admin';

function RoutesApp() {

    const navigate = useNavigate();
    return (
        <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route element={<PrivateRoute />}>
                <Route path="/feed" element={<Feed />} />
                <Route path="/perfil/:id" element={<Perfil />} />
                <Route path="/pessoa" element={<Pessoa />} />
                <Route path="/grupo" element={<Grupo />} />
                <Route path="/cadastroPost" element={<CadastroPost />} />
                <Route path="/detalhePost/:id" element={<DetalhePost />} />
                <Route path="/grupo/:id" element={<GrupoDetalhe />} />
                <Route element={<AdminRoute />}>
                    <Route path='/admin' element={<Admin />} />
                </Route>
            </Route>
            <Route path="*" element={<Erro />} />
        </Routes>
    )
}

export default RoutesApp;