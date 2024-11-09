import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarMarca() {
    const [nombre, setNombre] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // Campo de búsqueda
    const [marcaId, setMarcaId] = useState(null); // Estado para almacenar el ID de la marca
    const { id } = useParams(); // Para obtener el ID de la marca a editar, si existe
    const navigate = useNavigate();

    // Obtener la información de la marca para editar (si el ID está disponible)
    useEffect(() => {
        if (id) {
            console.log('ID de la marca:', id);
            const fetchMarca = async () => {
                const response = await fetch(`http://localhost:8080/api/marcas/${id}`);
                if (response.ok) {
                    const marca = await response.json();
                    setNombre(marca.nombre);
                    setLogoUrl(marca.logoUrl); // Cargar el logo actual
                    setMarcaId(marca.id); // Guardar el ID de la marca
                } else {
                    alert('No se pudo obtener la marca');
                }
            };
            fetchMarca();
        }
    }, [id]);

    // Función para buscar la marca por nombre
    const buscarMarcaPorNombre = async () => {
        if (searchQuery.trim()) {
            const response = await fetch(`http://localhost:8080/api/marcas/buscar/${searchQuery}`);
            if (response.ok) {
                const marca = await response.json();
                setNombre(marca.nombre);
                setLogoUrl(marca.logoUrl);
                setMarcaId(marca.id); // Establecer el ID de la marca cuando se encuentra
            } else {
                alert('Marca no encontrada');
            }
        } else {
            alert('Por favor, ingrese un nombre para buscar');
        }
    };

    // Función para manejar el cambio de archivo (logo)
    const handleFileChange = (event) => {
        setLogo(event.target.files[0]);
    };

    // Subir el logo y obtener su URL
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

        return await uploadResponse.text();  // Esto devuelve la URL del logo
    };

    // Función para enviar los datos de la marca al backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!marcaId) {
                alert('Por favor, busque una marca antes de intentar actualizarla');
                return;
            }

            // Paso 1: Subir el logo si se seleccionó uno nuevo
            let logoUrlFinal = logoUrl; // Si no se seleccionó un nuevo logo, mantener el anterior
            if (logo) {
                logoUrlFinal = await uploadLogo();  // Subir el logo y obtener la URL
            }

            // Paso 2: Enviar los datos de la marca (nombre y logo)
            const marcaData = {
                nombre: nombre,  // Nombre de la marca a actualizar
                logoUrl: logoUrlFinal  // URL del logo (si fue actualizado)
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
            navigate('/menuMarcas'); // Redirigir a la lista de marcas
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un error al actualizar la marca');
        }
    };

    return (
        <div className="sidebar">
            <a href="#" onClick={() => navigate('/menuPrincipal')}>
                <h3>Menu Principal</h3>
            </a>
            <a href="#" onClick={() => navigate('/menuMarcas')}>
                <h3>Menu Marcas</h3>
            </a>
            <a href="#" onClick={() => navigate('/menuModelos')}>
                <h3>Menu Modelos</h3>
            </a>
            <a href="#" onClick={() => navigate('/')}>
                <h3>Cerrar sesión</h3>
            </a>
            <div className='Editar'>
                <h3>Buscar y Editar Marca</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Buscar por nombre"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={buscarMarcaPorNombre}>Buscar</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Logo:</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                        />
                        {logoUrl && (
                            <div>
                                <img src={logoUrl} alt="Logo Actual" width="100" />
                            </div>
                        )}
                    </div>
                    <button type="submit">Actualizar Marca</button>
                </form>
            </div>
        </div>
    );
}

export default EditarMarca;
