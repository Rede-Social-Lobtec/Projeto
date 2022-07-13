import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './services/routes';
import { AuthProvider } from './components/contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
