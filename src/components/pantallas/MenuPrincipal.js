import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPrincipal.css'

function MenuPrincipal(){
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(null);
    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
      };
    return(
      <div className='MenuPrincipal'>
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
        <div className=' vacio'>
          <h2>Foto</h2>
        </div>
        </div>
    );
}
export default MenuPrincipal;