import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarMarca.css';

function EditarMarca() {
    const [nombre, setNombre] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [marcaId, setMarcaId] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [activeLink, setActiveLink] = useState(null);

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };

    useEffect(() => {
        if (id) {
            const fetchMarca = async () => {
                const response = await fetch(`http://localhost:8080/api/marcas/${id}`);
                if (response.ok) {
                    const marca = await response.json();
                    setNombre(marca.nombre);
                    setLogoUrl(marca.logoUrl);
                    setMarcaId(marca.id);
                } else {
                    alert('No se pudo obtener la marca');
                }
            };
            fetchMarca();
        }
    }, [id]);

    const buscarMarcaPorNombre = async () => {
        if (searchQuery.trim()) {
            const response = await fetch(`http://localhost:8080/api/marcas/buscar/${searchQuery}`);
            if (response.ok) {
                const marca = await response.json();
                setNombre(marca.nombre);
                setLogoUrl(marca.logoUrl);
                setMarcaId(marca.id);
            } else {
                alert('Marca no encontrada');
            }
        } else {
            alert('Por favor, ingrese un nombre para buscar');
        }
    };

    const handleFileChange = (event) => {
        setLogo(event.target.files[0]);
    };

    const uploadLogo = async () => {
        const formData = new FormData();
        formData.append('file', logo);

        const uploadResponse = await fetch('http://localhost:8080/api/files/upload', {
            method: 'POST',
            body: formData
        });

        if (!uploadResponse.ok) {
            throw new Error('Error al cargar el archivo');
        }

        return await uploadResponse.text();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!marcaId) {
                alert('Por favor, busque una marca antes de intentar actualizarla');
                return;
            }

            let logoUrlFinal = logoUrl;
            if (logo) {
                logoUrlFinal = await uploadLogo();
            }

            const marcaData = {
                nombre: nombre,
                logoUrl: logoUrlFinal
            };

            const marcaResponse = await fetch(`http://localhost:8080/api/marcas/${marcaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(marcaData)
            });

            if (!marcaResponse.ok) {
                throw new Error('Error al actualizar la marca');
            }

            alert('Marca actualizada con éxito');
            navigate('/menuMarcas');
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la marca');
        }
    };

    return (
        <div className="menu-principal">
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
            <div className="editar-container">
                <div className="editar">
                    <h3>Buscar y Editar Marca</h3>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={buscarMarcaPorNombre}>Buscar</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Nombre de la marca"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="file"
                                onChange={handleFileChange}
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={!marcaId}>Actualizar Marca</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditarMarca;
