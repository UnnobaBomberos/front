import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuMarcas(){
    const navigate = useNavigate();
    const handleNavigation = (path, index) => {
        //setActiveLink(index); // Cambiar el estado del enlace activo.
        navigate(path); // Navegar a la ruta deseada.
    };
    const irAAgregarMarca = () => {
        navigate('/agregarMarca'); // Redirige a RegistrarAsiento.js
      };
      const iraTodasLasMarcas = () => {
        navigate('/mostrarMarca'); // Redirige a RegistrarAsiento.js
      };
      
      const irAEditarMarcas = () => {
        navigate('/EditarMarca'); // Redirige a EditarAsiento.js
      };
      
      const irAEliminarMarcas = () => {
        navigate('/eliminarMarca'); // Redirige a BorrarAsiento.js
      };
    return(
        <div className="sidebar">
            <a href="#" onClick={() => handleNavigation('/menuPrincipal')}> <h3>Menu Principal</h3> </a> {/* Boton para ir a l menu principal*/}
            <a href="#" onClick={() => handleNavigation('/menuMarcas')}> <h3>Menu Marcas</h3> </a> {/* Boton para ir a l menu marcas*/}
            {/*<a href="#" onClick={() => handleNavigation('/menuModelos')}> <h3>Menu Modelos</h3> </a>  Boton para ir a l menu modelos*/}
            <div className='Contenedor'>
                <h2>Elige la acción que deseas realizar</h2>
                <div class="button-container">
                    <button onClick={iraTodasLasMarcas}>Mostrar todas las marcas</button> {/* Nuevo botón */}
                    <button onClick={irAAgregarMarca}>Agregar marca</button>
                    <button onClick={irAEditarMarcas}> Editar marca</button>
                    <button onClick={irAEliminarMarcas}>Eliminar marca</button>
                </div>
            </div>
        </div>
    );
}
export default MenuMarcas;