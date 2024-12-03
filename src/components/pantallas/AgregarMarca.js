import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AgregarMarca.css';

function AgregarMarca() {
    const [nombre, setNombre] = useState('');
    const [logo, setLogo] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };

    // Manejar la carga del archivo
    const handleFileChange = (event) => {
        setLogo(event.target.files[0]);
    };

    // Manejar la creación de la marca
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Paso 1: Subir el archivo de logo
            const formData = new FormData();
            formData.append('file', logo);

            const uploadResponse = await fetch('http://localhost:8080/api/files/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Error al cargar el archivo');
            }

            // Obtener la URL del logo desde la respuesta
            const logoUrl = await uploadResponse.text();

            // Paso 2: Crear la marca con la URL del logo
            const marcaData = {
                nombre: nombre,
                logoUrl: logoUrl,
            };

            const marcaResponse = await fetch('http://localhost:8080/api/marcas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(marcaData),
            });

            if (!marcaResponse.ok) {
                throw new Error('Error al crear la marca');
            }

            alert('Marca creada con éxito');
            
            // Reiniciar el formulario
            setNombre('');
            setLogo(null);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear la marca');
        }
    };

    return (
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
                  onClick={() => handleNavigation('/',4)}
                >
                  <h3>Cerrar sesión</h3>
                </a>
                </div>
            </div>
        </div>
        </aside>
            <div className='agregar-container'>
                <div className='agregar'>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre de la Marca:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="logo" className="custom-file-upload">
                                Seleccionar archivo
                            </label>
                            <input
                                id="logo"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit">Crear Marca</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
}

export default AgregarMarca;
