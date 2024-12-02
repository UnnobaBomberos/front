import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditarModelo() {
    const [nombre, setNombre] = useState('');
    const [año, setAño] = useState(null);
    const [imagenRes, setImagenRes] = useState('');
    const [pdf, setPdf] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [marcaId, setMarcaId] = useState(null);
    const [modelos, setModelos] = useState([]);
    const [marca, setMarca] = useState([]);
    const [modeloId, setModeloId] = useState(null);  // Agrega un estado para el id del modelo seleccionado
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(null);
   

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };
    useEffect(() => {
      const fetchModelos = async () => {
          const response = await fetch('http://localhost:8080/api/modelos');
          if (response.ok) {
              const modelos = await response.json();
              setModelos(modelos);
              // Si tienes un id en la URL, busca ese modelo y establece sus valores
              if (id) {
                  const modelo = modelos.find((m) => m.id === parseInt(id));
                  if (modelo) {
                      setNombre(modelo.nombre);
                      setAño(modelo.año);
                      setImagenRes(modelo.imageRes);
                      setPdf(modelo.pdf);
                      setMarcaId(modelo.marca.id);
                      setModeloId(modelo.id);
                  }
              }
          } else {
              alert('No se pudo obtener los modelos');
          }
      };
  
      const fetchMarcas = async () => {
          const response = await fetch('http://localhost:8080/api/marcas');
          if (response.ok) {
              const marcas = await response.json();
              setMarca(marcas);
          } else {
              alert('No se pudo obtener las marcas');
          }
      };
  
      fetchModelos();
      fetchMarcas();
  }, [id]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectModelo = (modelo) => {
        setSearchQuery(modelo.nombre);
        setNombre(modelo.nombre);
        setAño(modelo.año);
        setImagenRes(modelo.imageRes);
        setPdf(modelo.pdf);
        setMarcaId(modelo.marca.id);
        setModeloId(modelo.id);
        console.log(modeloId); // Verificar que modeloId tiene el valor correcto
    };

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleAñoChange = (event) => {
        setAño(event.target.value);
    };

    const handleImagenResChange = (event) => {
        setImagenRes(event.target.files[0]);
    };

    const handlePdfChange = (event) => {
        setPdf(event.target.files[0]);
    };

    const handleMarcaChange = (event) => {
        setMarcaId(event.target.value);
    };

    const filteredModelos = modelos.filter(modelo =>
        modelo.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!modeloId) {
          alert('El modelo no ha sido seleccionado correctamente');
          return;
      }
  
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('año', año);
      formData.append('marca_id', marcaId);  // Asegúrate de incluir este campo
      
      if (imagenRes) {
          formData.append('imageRes', imagenRes);
      }
      
      if (pdf) {
          formData.append('pdf', pdf);
      }
      if (!marcaId) {
        alert('El campo "marca_id" es obligatorio.');
        return;
    }
    
  
      try {
          const response = await fetch(`http://localhost:8080/api/modelos/${modeloId}`, {
              method: 'PUT',
              body: formData,
          });
  
          if (response.ok) {
              alert('Modelo actualizado exitosamente');
              navigate('/menuModelos');
          } else {
              alert('Hubo un error al actualizar el modelo');
          }
      } catch (error) {
          console.error('Error:', error);
          alert('Hubo un error al realizar la actualización');
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
            <div className='Editar'>
                <h3>Buscar y Editar Modelo</h3>
                <div>
                    <input
                        type="text"
                        placeholder="Buscar modelo..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <div>
                        {filteredModelos.map((modelo) => (
                            <div
                                key={modelo.id}
                                onClick={() => handleSelectModelo(modelo)}
                                style={{ cursor: 'pointer', margin: '5px 0' }}
                            >
                                {modelo.nombre}
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={handleNombreChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Año:</label>
                        <input
                            type="number"
                            value={año}
                            onChange={handleAñoChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Imagen de Rescate:</label>
                        <input
                            type="file"
                            onChange={handleImagenResChange}
                        />
                    </div>
                    <div>
                        <label>PDF:</label>
                        <input
                            type="file"
                            onChange={handlePdfChange}
                        />
                    </div>
                    <div>
                        <label>Marca:</label>
                        <select value={marcaId} onChange={handleMarcaChange} required>
                            <option value="">Seleccione una marca</option>
                            {marca.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Actualizar Modelo</button>
                </form>
            </div>
        </div>
    );
}

export default EditarModelo;
