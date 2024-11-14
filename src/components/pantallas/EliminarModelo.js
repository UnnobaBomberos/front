import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Eliminar.css';

function EliminarModelo() {
    const [searchQuery, setSearchQuery] = useState(''); // Campo de búsqueda por nombre
    const [modeloId, setModeloId] = useState(null); // Estado para almacenar el ID del modelo
    const navigate = useNavigate();

    // Función para buscar el modelo por nombre
    const buscarModeloPorNombre = async () => {
        if (searchQuery.trim()) {
            const response = await fetch(`http://localhost:8080/api/modelos/buscar/${searchQuery}`);
            if (response.ok) {
                const modelo = await response.json();
                setModeloId(modelo.id); // Guardar el ID del modelo encontrado
                alert('Modelo encontrado: ' + modelo.nombre);
            } else {
                alert('Modelo no encontrado');
                setModeloId(null); // Limpiar el ID si no se encuentra el modelo
            }
        } else {
            alert('Por favor, ingrese un nombre para buscar');
        }
    };

    // Función para eliminar el modelo
    const eliminarModelo = async () => {
        if (modeloId) {
            const response = await fetch(`http://localhost:8080/api/modelos/${modeloId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Modelo eliminado con éxito');
                navigate('/menuModelos'); // Redirigir al menú de modelos
            } else {
                alert('Error al eliminar el modelo');
            }
        } else {
            alert('Por favor, busque un modelo antes de intentar eliminarlo');
        }
    };

    return (
        <div className='menu-principal'>
            <aside className='sidebar'>
                <div className="toggle">
                    <h2>Menu Modelos</h2>
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
                                onClick={() => navigate('/menuMarcas')}
                            >
                                <h3>Menu Marcas</h3>
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
                    <h3>Eliminar Modelo</h3>
                    <div className='search-bar'>
                        <input
                            type="text"
                            placeholder="Buscar por nombre"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={buscarModeloPorNombre}>Buscar</button>
                    </div>
                    <div>
                        <button onClick={eliminarModelo} disabled={!modeloId}>Eliminar Modelo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EliminarModelo;
