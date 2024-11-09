import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuModelos(){
  const navigate = useNavigate();
  const handleNavigation = (path, index) => {
      //setActiveLink(index); // Cambiar el estado del enlace activo.
      navigate(path); // Navegar a la ruta deseada.
  };
  const irAAgregarModelos = () => {
      navigate('/agregarModelo'); // Redirige a RegistrarAsiento.js
    };
    const iraTodosLosModelos = () => {
      navigate('/mostrarModelo'); // Redirige a RegistrarAsiento.js
    };
    
    const irAEditarModelos = () => {
      navigate('/EditarModelo'); // Redirige a EditarAsiento.js
    };
    
    const irAEliminarModelos = () => {
      navigate('/eliminarModelo'); // Redirige a BorrarAsiento.js
    };
  return(
      <div className="sidebar">
          <a href="#" onClick={() => handleNavigation('/menuPrincipal')}> <h3>Menu Principal</h3> </a> {/* Boton para ir a l menu principal*/}
          <a href="#" onClick={() => handleNavigation('/MenuMarcas')}> <h3>Menu Marcas</h3> </a> {/* Boton para ir a l menu marcas*/}
          <a href="#" onClick={() => handleNavigation('/menuModelos')}> <h3>Menu Modelos</h3> </a> {/* Boton para ir a l menu modelos*/}
          <div className='Contenedor'>
              <h2>Elige la acción que deseas realizar</h2>
              <div class="button-container">
                  <button onClick={iraTodosLosModelos}>Mostrar todos los modelos</button> {/* Nuevo botón */}
                  <button onClick={irAAgregarModelos}>Agregar modelo</button>
                  <button onClick={irAEditarModelos}> Editar modelo</button>
                  <button onClick={irAEliminarModelos}>Eliminar modelo</button>
              </div>
          </div>
      </div>
  );
}
export default MenuModelos;