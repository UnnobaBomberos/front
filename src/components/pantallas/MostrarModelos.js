import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MostrarModelos.css';

function MostrarModelos() {
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
    <div className="sidebar">
      <a href="#" onClick={() => handleNavigation('/menuPrincipal')}>
        <h3>Menu Principal</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/menuMarcas')}>
        <h3>Menu Marcas</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/menuModelos')}>
        <h3>Menu Modelos</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/')}>
        <h3>Cerrar sesión</h3>
      </a>
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
