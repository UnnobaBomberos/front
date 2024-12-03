import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GestionUsuarios.css';

function GestionUsuarios() {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(null);

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };

    const irAAgregarUsuario = () => {
        navigate('/agregarUsuario'); // Redirige a agregar usuario
    };

    const mostrarUsuarios = () => {
        navigate('/mostrarUsuarios'); // Redirige a mostrar usuarios
    };

    return (
        <div className="MenuPrincipal">
            <aside>
                <div className="toggle">
                    <h2>Menu</h2>
                    <div className="sidebar">
                        <div>
                            <a
                                href="#"
                                className={activeLink === 0 ? 'active clicked' : ''}
                                onClick={() => handleNavigation('/menuUsuarios', 0)}
                            >
                                <h3>Menu Usuarios</h3>
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
                                onClick={() => handleNavigation('/', 4)}
                            >
                                <h3>Cerrar sesión</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Contenedor principal */}
            <div className="contenedor-principal">
                <h2>Elige la acción que deseas realizar</h2>
                <div className="button-container">
                    <button onClick={mostrarUsuarios}>Mostrar todos los usuarios</button>
                    <button onClick={irAAgregarUsuario}>Agregar nuevo usuario</button>
                </div>
            </div>
        </div>
    );
}

export default GestionUsuarios;
