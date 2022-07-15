import { Routes, Route, useNavigate} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Feed from '../pages/Feed';
import Perfil from '../pages/Perfil';
import Pessoa from '../pages/Pessoa';
import Grupo from '../pages/Grupo';
import Erro from '../pages/Erro';
import GrupoDetalhe from '../pages/GrupoDetalhe';
import PerfilUser from '../pages/PerfilUser';

// import CadastroPost from '../components/CadastroPost';
import Admin from '../pages/Admin';

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
                <Route path="/pessoa" element={<Pessoa />} />
                <Route path="/grupo" element={<Grupo />} />

                {/* <Route path="/cadastroPost" element={<CadastroPost />} /> */}

                <Route path="/grupo/:id" element={<GrupoDetalhe />} />
                <Route path='/perfil-user/:id' element={<PerfilUser/>}/>
                <Route path='/admin' element={<Admin/>}/>
            </Route>
            <Route path="*" element={<Erro />} />
        </Routes>
    )
}

export default RoutesApp;