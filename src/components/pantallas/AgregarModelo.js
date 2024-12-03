import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './agregarModelo.css'; // Archivo CSS actualizado

const AgregarModelo = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [año, setAño] = useState('');
    const [marca_id, setmarca_id] = useState('');
    const [tipo_combustible, setTipoCombustible] = useState('');
    const [imageRes, setImageRes] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [activeLink, setActiveLink] = useState(null);

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/marcas')
            .then(response => response.json())
            .then(data => setMarcas(data))
            .catch(error => console.error('Error al cargar marcas:', error));
    }, []);

    const handleImageChange = (e) => setImageRes(e.target.files[0]);
    const handlePdfChange = (e) => setPdf(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("año", año);
        formData.append("marca_id", marca_id);
        formData.append("tipo_combustible", tipo_combustible);
        if (imageRes) formData.append("imageRes", imageRes);
        if (pdf) formData.append("pdf", pdf);

        try {
            const response = await fetch("http://localhost:8080/api/modelos", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert("Modelo agregado con éxito: " + data.nombre);
            } else {
                alert("Error al agregar el modelo");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al enviar la solicitud");
        }
    };

    return (
        <div className="menu-container">
            <aside>
                <div className="toggle">
                    <h2>Menu </h2>
                    <div className="sidebar">
                        <div>
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
                                onClick={() => handleNavigation('/menuModelos', 2)}
                            >
                                <h3>Menu Modelos</h3>
                            </a>
                            <a
                                href="#"
                                className={activeLink === 4 ? 'active clicked' : ''}
                                onClick={() => handleNavigation('/', 4)}
                            >
                                <h3>Cerrar sesión</h3>
                            </a>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Contenedor principal */}
            <div className="agregar-modelo-container">
                <h1>Agregar Modelo</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre del modelo:</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
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
                        <label>Tipo de combustible:</label>
                        <select value={tipo_combustible} onChange={(e) => setTipoCombustible(e.target.value)} required>
                            <option value="">Seleccionar Tipo de Combustible</option>
                            <option value="Electrico">Eléctrico</option>
                            <option value="Hibrido">Híbrido</option>
                            <option value="Combustion">Combustión</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="imageRes" className="custom-file-upload">
                            Seleccionar imageRes
                        </label>
                        <input
                            id="imageRes"
                            type="file"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pdf" className="custom-file-upload">
                            Seleccionar PDF (Hoja de Rescate)
                        </label>
                        <input
                            id="pdf"
                            type="file"
                            accept=".pdf"
                            onChange={handlePdfChange}
                            required
                        />
                    </div>
                    <button type="submit">Agregar Modelo</button>
                </form>
            </div>
        </div>
    );
};

export default AgregarModelo;
