import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPrincipal.css';

function MenuPrincipal() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);
  
  const handleNavigation = (path, index) => {
    setActiveLink(index);
    navigate(path);
  };

  return (
    <div className="MenuPrincipal">
      <aside>
        <div className="toggle">
          <h2>Menu Principal</h2>
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
      <main className="main-content">
        <div className="welcome-message">
          <h1>Bienvenido</h1>
          <p>A la aplicación web de bomberos</p>
        </div>
      </main>
    </div>
  );
}

export default MenuPrincipal;
