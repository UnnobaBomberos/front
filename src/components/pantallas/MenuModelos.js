import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuAdmin.css';

function MenuModelos() {
  const navigate = useNavigate();

  const handleNavigation = (path, index) => {
    navigate(path); // Navegar a la ruta deseada.
  };

  const irAAgregarModelos = () => {
    navigate('/agregarModelo'); // Redirige a AgregarModelo.js
  };

  const iraTodosLosModelos = () => {
    navigate('/mostrarModelo'); // Redirige a MostrarModelo.js
  };

  const irAEditarModelos = () => {
    navigate('/EditarModelo'); // Redirige a EditarModelo.js
  };

  const irAEliminarModelos = () => {
    navigate('/eliminarModelo'); // Redirige a EliminarModelo.js
  };

  const [activeLink, setActiveLink] = useState(null);

  return (
    <div className='MenuPrincipal'>
        <aside>
        <div className="toggle">
            <h2>Menu Modelos</h2>
            <div className="sidebar">
            <div >
                <a
                  href="#"
                  className={activeLink === 0 ? 'active clicked' : ''} 
                  onClick={() => handleNavigation('/menuprincipal', 0)}
                >
                  <h3>Volver a Menu Principal</h3>
                </a>
                <a
                  href="#"
                  className={activeLink === 1 ? 'active clicked' : ''}
                  onClick={() => handleNavigation('/menuMarcas', 1)}
                >
                  <h3>Menu Marcas</h3>
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
      
      <div className='Contenedor'>
        <h2>Elige la acción que deseas realizar</h2>
        <div className="button-container">
          <button onClick={iraTodosLosModelos}>Mostrar todos los modelos</button>
          <button onClick={irAAgregarModelos}>Agregar modelo</button>
          <button onClick={irAEditarModelos}>Editar modelo</button>
          <button onClick={irAEliminarModelos}>Eliminar modelo</button>
        </div>
      </div>
    </div>
  );
}

export default MenuModelos;

