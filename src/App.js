import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routers from './Routes'
import AuthContext from './Context/AuthContext'
import PrefixContext  from './Context/PrefixContext';

function App() {
  return (
    <>
      <AuthContext>
        <PrefixContext>
          <Routers/>
        </PrefixContext>
      </AuthContext>
    </>
  );
}

export default App;
