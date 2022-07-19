import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './services/routes';
import { AuthProvider } from './components/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer autoClose={3000}/>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
