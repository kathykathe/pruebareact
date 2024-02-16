import { useState } from 'react';
import PropTypes from 'prop-types';

function Buscador({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
 <div className="d-flex justify-content-center align-items-center">
    <div className="input-group mb-3">
  <input
          type="text"
          className="form-control"
          placeholder="Buscar..."
          value={query}
          onChange={handleInputChange}
        />
   <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={handleSearchClick}
        >
          Buscar
    </button>
   </div>
  </div>
  );
}

Buscador.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Buscador;
