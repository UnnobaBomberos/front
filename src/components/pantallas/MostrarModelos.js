// MostrarModelos.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MostrarModelos.css';

function MostrarModelos() {
  const [activeLink, setActiveLink] = useState(null);
  const [modelos, setModelos] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const verPdf = (pdfPath) => {
    if (pdfPath) {
      const pdfUrl = `http://localhost:8080/api/files/files/${pdfPath.split('\\').pop()}`;
      window.open(pdfUrl, '_blank');
    } else {
      console.error("PDF no disponible");
    }
  };

  useEffect(() => {
    const mostrarModelos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/modelos');
        if (response.ok) {
          const data = await response.json();
          setModelos(data);
        } else {
          console.error('Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error('Error al obtener los modelos:', error);
      }
    };

    mostrarModelos();
  }, []);

  return (
    <div className='Hola mundo'>
    <aside>
     <div className="toggle">
         <h2>Menu Principal</h2>
         <div className="sidebar">
         <div >
             <a
               href="#"
               className={activeLink === 0 ? 'active clicked' : ''} 
               onClick={() => handleNavigation('/menuMarcas', 0)}
             >
               <h3>Menu Marcas</h3>
             </a>
             <a
               href="#"
               className={activeLink === 1 ? 'active clicked' : ''}
               onClick={() => handleNavigation('/menuModelos', 1)}
             >
               <h3>Menu Modelos</h3>
             </a>
             <a
               href="#"
               className={activeLink === 2 ? 'active clicked' : ''}
               onClick={() => handleNavigation('/',2)}
             >
               <h3>Cerrar sesión</h3>
             </a>
             </div>
         </div>
     </div>
     </aside>
      <div className="modelos-container">
        <h1>Modelos de Autos</h1>
        <div className="modelos-grid">
          {modelos.map((modelo) => (
            <div key={modelo.id} className="card">
              <img
                src={
                  modelo.imageRes
                    ? `http://localhost:8080/api/files/files/${modelo.imageRes.split('\\').pop()}`
                    : 'URL_de_imagen_por_defecto'
                }
                alt={modelo.nombre_modelo}
                className="card__image"
              />
              <div className="card__content">
                <p className="card__title">{modelo.nombre_modelo}</p>
                <p className="card__description">
                  Año: {modelo.año} <br />
                  Marca: {modelo.marca?.nombre || "Marca desconocida"}
                </p>
                <button onClick={() => verPdf(modelo.pdf)}>
                  Ver PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostrarModelos;

