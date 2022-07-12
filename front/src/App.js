import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './services/routes';
import TokenProvider from './components/contexts/token';

function App() {
  return (
    <TokenProvider>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </TokenProvider>
  );
}

export default App;
