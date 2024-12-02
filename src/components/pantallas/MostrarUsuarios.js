import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Mostrarusuario.css";

function MostrarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarContraseñas, setMostrarContraseñas] = useState({});

  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(null);

  const handleNavigation = (path, index) => {
      setActiveLink(index);
      navigate(path);
    };

  // Función para obtener los usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/usuario"); // Cambia al endpoint correspondiente
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Hook para cargar los usuarios al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Función para alternar la visibilidad de la contraseña
 /* const toggleMostrarContraseña = (id) => {
    setMostrarContraseñas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
*/
  return (
    <div className="Menu">
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
    <div className="contenedor">
      <h1>Lista de Usuarios</h1>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombreUsuario}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No hay usuarios registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}

export default MostrarUsuario;
