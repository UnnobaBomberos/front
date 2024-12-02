import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [nombreUsuario, setnombreUsuario] = useState('');
    const [contrasenia, setcontrasenia] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const loginData = {
            nombreUsuario: nombreUsuario,
            contrasenia: contrasenia,
        };
        try {
            console.log('Enviando:', loginData);
            const response = await fetch('http://localhost:8080/api/usuario/autenticar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });
            
            console.log('Respuesta:', response);
            const data = await response.json();
            console.log('Datos recibidos:', data);
            
            if (response.ok) {
                if (data.success) {
                    alert('Inicio de sesión exitoso');
                    navigate('/menuprincipal');
                } else {
                    alert('Credenciales incorrectas');
                }
            } else {
                alert('Error en la autenticación');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al intentar iniciar sesión');
        }
    };        
    

    return (
        <div className="container">
            <form className="form_main" onSubmit={handleSubmit}>
                <p className="heading">Ancap Argentina</p>
                <div className="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                        <path d="M8 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM2 14s1-4 6-4 6 4 6 4H2z"></path>
                    </svg>
                    <input
                        placeholder="Usuario"
                        id="nombreUsuario"
                        className="inputField"
                        type="text"
                        value={nombreUsuario} // Vincula el valor del input al estado
                        onChange={(e) => setnombreUsuario(e.target.value)} // Actualiza el estado al escribir
                    />
                </div>
                
                <div className="inputContainer">
                    <svg viewBox="0 0 16 16" fill="#2e2e2e" height="16" width="16" xmlns="http://www.w3.org/2000/svg" className="inputIcon">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                    </svg>
                    <input
                        placeholder="Contraseña"
                        id="contrasenia"
                        className="inputField"
                        type="password"
                        value={contrasenia} // Vincula el valor del input al estado
                        onChange={(e) => setcontrasenia(e.target.value)} // Actualiza el estado al escribir
                    />
                </div>
                
                <button id="button" type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default Login;
