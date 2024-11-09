import React, { useState, useEffect } from 'react';

function EliminarModelo() {
  const [modelos, setModelos] = useState([]); // Lista de modelos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [selectedModelo, setSelectedModelo] = useState(null); // Modelo seleccionado
  const [error, setError] = useState(null); // Manejo de errores

  useEffect(() => {
    const fetchModelos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/modelos');
        if (!response.ok) {
          throw new Error('No se pudo cargar la lista de modelos');
        }
        const data = await response.json();
        setModelos(data);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModelos();
  }, []);

  const eliminarModelo = async () => {
    if (!selectedModelo) {
      alert('Por favor selecciona un modelo para eliminar');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/modelos/${selectedModelo.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setModelos(modelos.filter((modelo) => modelo.id !== selectedModelo.id));
        alert('Modelo eliminado correctamente');
      } else {
        alert('Error al eliminar el modelo');
      }
    } catch (error) {
      console.error('Error al eliminar el modelo', error);
      alert('Error al conectar con el servidor');
    }
  };

  if (loading) return <p>Cargando modelos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Eliminar Modelo</h1>
      <h3>Selecciona un modelo para eliminar:</h3>
      <select onChange={(e) => setSelectedModelo(JSON.parse(e.target.value))} value={selectedModelo ? JSON.stringify(selectedModelo) : ''}>
        <option value="">--Seleccionar Modelo--</option>
        {modelos.map((modelo) => (
          <option key={modelo.id} value={JSON.stringify(modelo)}>
            {modelo.nombre} ({modelo.año}) - {modelo.marca.nombre}
          </option>
        ))}
      </select>
      <button onClick={eliminarModelo} disabled={!selectedModelo}>Eliminar Modelo</button>
    </div>
  );
}

export default EliminarModelo;
