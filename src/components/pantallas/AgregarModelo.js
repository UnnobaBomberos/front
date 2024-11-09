import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AgregarModelo = () => {
    const navigate = useNavigate();
    const [nombre_modelo, setnombre_modelo] = useState('');
    const [año, setAño] = useState('');
    const [marca_id, setmarca_id] = useState('');
    const [imageRes, setImageRes] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [marcas, setMarcas] = useState([]);

    const handleNavigation = (path, index) => {
      navigate(path);
    };

    useEffect(() => {
        // Cargar las marcas disponibles para seleccionar
        fetch('http://localhost:8080/api/marcas')
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error al cargar marcas:', error));
    }, []);

    const handleImageChange = (e) => {
        setImageRes(e.target.files[0]);
    };

    const handlePdfChange = (e) => {
        setPdf(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("nombre_modelo", nombre_modelo);
        formData.append("año", año);
        formData.append("marca_id", marca_id);
        if (imageRes) formData.append("imageRes", imageRes);
        if (pdf) formData.append("pdf", pdf);

        try {
            const response = await fetch("http://localhost:8080/api/modelos", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Modelo agregado con éxito: " + data.nombre_modelo);
            } else {
                alert("Error al agregar el modelo");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al enviar la solicitud");
        }
    };

    return (
      <div className="sidebar">
      <a href="#" onClick={() => handleNavigation('/menuPrincipal')}>
        <h3>Menu Principal</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/menuMarcas')}>
        <h3>Menu Marcas</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/menuModelos')}>
        <h3>Menu Modelos</h3>
      </a>
      <a href="#" onClick={() => handleNavigation('/')}>
        <h3>Cerrar sesión</h3>
      </a>
      <div className='agregar'>
            <h1>Agregar Modelo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del modelo:</label>
                    <input
                        type="text"
                        value={nombre_modelo}
                        onChange={(e) => setnombre_modelo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Año:</label>
                    <input
                        type="number"
                        value={año}
                        onChange={(e) => setAño(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Marca:</label>
                    <select value={marca_id} onChange={(e) => setmarca_id(e.target.value)} required>
                        <option value="">Seleccionar Marca</option>
                        {marcas.map((marca) => (
                            <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div>
                    <label>PDF:</label>
                    <input type="file" onChange={handlePdfChange} />
                </div>
                <button type="submit">Agregar Modelo</button>
            </form>
        </div>
        </div>
    );
};

export default AgregarModelo;
