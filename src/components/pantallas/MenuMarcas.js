import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuAdmin.css';

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
      const [activeLink, setActiveLink] = useState(null);
    return(
      <div className='MenuPrincipal'>
      <aside>
        <div className="toggle">
            <h2>Menu</h2>
            <div className="sidebar">
            <div >
            <a
                  href="#"
                  className={activeLink === 0 ? 'active clicked' : ''} 
                  onClick={() => handleNavigation('/menuUsuarios', 0)}
                >
                  <h3>Menu usuarios</h3>
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
                  onClick={() => handleNavigation('/menuModelos', 3)}
                >
                  <h3>Menu Modelos</h3>
                </a>
                <a
                  href="#"
                  className={activeLink === 4 ? 'active clicked' : ''}
                  onClick={() => handleNavigation('/',4)}
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