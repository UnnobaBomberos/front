import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Agregar.css';

function AgregarModelo() {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);
    const [activeLink, setActiveLink] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };

    // Manejar la carga del archivo
    const handleFileChange = (event) => {
        setImagen(event.target.files[0]);
    };

    // Manejar la creación del modelo
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Paso 1: Subir la imagen
            const formData = new FormData();
            formData.append('file', imagen);

            const uploadResponse = await fetch('http://localhost:8080/api/files/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Error al cargar el archivo');
            }

            // Obtener la URL de la imagen desde la respuesta
            const imagenUrl = await uploadResponse.text();

            // Paso 2: Crear el modelo con la URL de la imagen
            const modeloData = {
                nombre: nombre,
                imagenUrl: imagenUrl,
            };

            const modeloResponse = await fetch('http://localhost:8080/api/modelos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modeloData),
            });

            if (!modeloResponse.ok) {
                throw new Error('Error al crear el modelo');
            }

            alert('Modelo creado con éxito');
            
            // Reiniciar el formulario
            setNombre('');
            setImagen(null);

        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al crear el modelo');
        }
    };

    return (
        <div className='MenuPrincipal'>
            <aside>
                <div className="toggle">
                    <h2>Menu Modelos</h2>
                    <div className="sidebar">
                        <div>
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
                                onClick={() => handleNavigation('/', 2)}
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
                            <label>Nombre del Modelo:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="imagen" className="custom-file-upload">
                                Seleccionar archivo
                            </label>
                            <input
                                id="imagen"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit">Crear Modelo</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AgregarModelo;
