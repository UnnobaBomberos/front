import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Eliminar.css'; // Asegúrate de que el archivo CSS esté bien importado

function EliminarMarca() {
    const [searchQuery, setSearchQuery] = useState(''); // Campo de búsqueda por nombre
    const [marcaId, setMarcaId] = useState(null); // Estado para almacenar el ID de la marca
    const navigate = useNavigate();

    // Función para buscar la marca por nombre
    const buscarMarcaPorNombre = async () => {
        if (searchQuery.trim()) {
            const response = await fetch(`http://localhost:8080/api/marcas/buscar/${searchQuery}`);
            if (response.ok) {
                const marca = await response.json();
                setMarcaId(marca.id); // Guardar el ID de la marca encontrada
                alert('Marca encontrada: ' + marca.nombre);
            } else {
                alert('Marca no encontrada');
                setMarcaId(null); // Limpiar el ID si no se encuentra la marca
            }
        } else {
            alert('Por favor, ingrese un nombre para buscar');
        }
    };

    // Función para eliminar la marca
    const eliminarMarca = async () => {
        if (marcaId) {
            const response = await fetch(`http://localhost:8080/api/marcas/${marcaId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Marca eliminada con éxito');
                navigate('/menuMarcas'); // Redirigir al menú de marcas
            } else {
                alert('Error al eliminar la marca');
            }
        } else {
            alert('Por favor, busque una marca antes de intentar eliminarla');
        }
    };

    return (
        <div className='menu-principal'>
            <aside className='sidebar'>
                <div className="toggle">
                    <h2>Menu Marcas</h2>
                    <div className="sidebar-links">
                        <div>
                            <a
                                href="#"
                                onClick={() => navigate('/menuPrincipal')}
                            >
                                <h3>Volver a Menu Principal</h3>
                            </a>
                            <a
                                href="#"
                                onClick={() => navigate('/menuModelos')}
                            >
                                <h3>Menu Modelos</h3>
                            </a>
                            <a
                                href="#"
                                onClick={() => navigate('/')}
                            >
                                <h3>Cerrar sesión</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
            <div className='eliminar-container'>
                <div className='eliminar'>
                    <h3>Eliminar Marca</h3>
                    <div className='search-bar'>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={buscarMarcaPorNombre}>Buscar</button>
                    </div>
                    <div>
                        <button onClick={eliminarMarca} disabled={!marcaId}>Eliminar Marca</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EliminarMarca;

