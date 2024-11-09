import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MostrarMarcas.css';

function MostrarMarcas() {
  const [marcas, setMarcas] = useState([]);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navegar a la ruta deseada.
  };

  useEffect(() => {
    const mostrarMarcas = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/marcas'); // Asegúrate de que la URL sea correcta
        if (response.ok) {
          const data = await response.json();
          setMarcas(data);
        } else {
          console.error('Error en la respuesta del servidor');
        }
      } catch (error) {
        console.error('Error al obtener las marcas:', error);
      }
    };

    mostrarMarcas(); // Llama a la función para obtener las marcas
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

      <div className="marcas-container">
        <h1>Marcas de Autos</h1>
        <div className="marcas-grid">
          {marcas.map((marca) => (
            <div key={marca.id} className="flip-card">
              <div className="flip-card-inner">
                {/* Parte delantera de la tarjeta */}
                <div className="flip-card-front">
                  <div className="profile-image">
                    <img
                      src={marca.logoUrl}
                      alt={`${marca.nombre} logo`}
                      className="pfp"
                    />
                  </div>
                </div>

                {/* Parte trasera de la tarjeta (el nombre de la marca) */}
                <div className="flip-card-back">
                  <div className="name">{marca.nombre}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MostrarMarcas;
