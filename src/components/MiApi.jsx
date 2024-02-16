import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MiApi = ({ info, setInfo, query }) => {
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [error, setError] = useState(null);

  const fetchAnimeDetails = async (animeId) => {
    try {
      const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`);
      if (!response.ok) {
        throw new Error('Error al obtener detalles del anime');
      }
      const data = await response.json();
      return data.data || null;
    } catch (error) {
      console.error('Error al obtener detalles del anime:', error.message);
      return null;
    }
  };

  const handleCardClick = async (animeId) => {
    const details = await fetchAnimeDetails(animeId);
    if (details) {
      setSelectedAnime(details);
    } else {
      setError('Error al cargar los detalles del anime. Inténtalo de nuevo.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}`);
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        if (Array.isArray(data?.data)) {
          setInfo(data.data);
        } else {
          console.error('Estructura de datos API incorrecta:', data);
          setError('Error al cargar los datos. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error al obtener datos de la API:', error.message);
        setError('Error al cargar los datos. Inténtalo de nuevo.');
      }
    };

    fetchData();
  }, [query, setInfo]);

return (
 <div className="container">
  {error && <p className="text-danger">{error}</p>}
  <div className="row mt-4 mb-4">
  {info.map((e) => (
  <div key={e.id} className="col-md-4 mb-3" onClick={() => handleCardClick(e.id)} style={{ cursor: 'pointer' }}>
   <div className="card">
   <img
   src={e.attributes.posterImage?.small}
   className="card-img-top"
   alt={e.attributes.canonicalTitle}
   style={{ maxHeight: '200px', objectFit: 'cover' }}
   />
    <div className="card-body">
    <h5 className="card-title">{e.attributes.canonicalTitle}</h5>
    <p className="card-text">
    {`${e.attributes.status}-${e.attributes.startDate}`}
     </p>
     <p className="card-text">
      Descripción: {e.attributes.description || 'No hay descripción disponible'}
       </p>
      </div>
      </div>
      </div>
       ))}
      </div>
      {selectedAnime && (
       <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
      <div className="modal-header">
      <h5 className="modal-title">{selectedAnime.attributes.canonicalTitle}</h5>
      <button type="button" className="close" onClick={() => setSelectedAnime(null)}>
       <span aria-hidden="true">&times;</span>
        </button>
        </div>
       <div className="modal-body">
       <p>Status: {selectedAnime.attributes.status}</p>
       <p>Fecha de inicio: {selectedAnime.attributes.startDate}</p>
       <p>Descripción: {selectedAnime.attributes.description}</p>
        </div>
        <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => setSelectedAnime(null)}>
           Cerrar
        </button>
         </div>
         </div>
          </div>
        </div>
      )}
    </div>
  );
};

MiApi.propTypes = {
  info: PropTypes.array.isRequired,
  setInfo: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default MiApi;
