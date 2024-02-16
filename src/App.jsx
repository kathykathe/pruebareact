import { useState } from 'react';
import Buscador from './components/Buscador';
import MiApi from './components/MiApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
  const [info, setInfo] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  return (
    <div className="container text-center my-5">
      <div className="landing-page mt-3">
        <h1>Bienvenido a nuestra aplicación de anime</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu7E3Wi12mhaadcBxOAiW4w6XDfwXyMwC_pw&usqp=CAU"
        />
      </div>
      <div className="d-flex justify-content-center">
        <Buscador onSearch={handleSearch} />
      </div>
      <MiApi info={info} setInfo={setInfo} query={query} />
      <footer className="mt-5">
        <p>© 2024 Tu Aplicación de Anime. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
