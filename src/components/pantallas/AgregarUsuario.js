import React, {useState} from "react";
import { useNavigate} from "react-router-dom";
import './agregarUsuario.css';
function AgregarUsuario(){
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [confirmContrasenia, setConfirmContrasenia]=useState('');
    const [resultado, setResultado] = useState('');

    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState(null);

    const handleNavigation = (path, index) => {
        setActiveLink(index);
        navigate(path);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (contrasenia !== confirmContrasenia) {
            setResultado('Las contraseñas no coinciden');
            return;
        }
    
        const usuario = {
            nombreUsuario: nombreUsuario,
            contrasenia: contrasenia,
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
    
            if (response.ok) {
                setResultado('Usuario registrado exitosamente');
                setNombreUsuario('');
                setContrasenia('');
                setConfirmContrasenia('');
            } else {
                const error = await response.json();
                setResultado(`Error: ${error.message}`);
            }
        } catch (err) {
            setResultado('Error al conectar con el servidor');
        }
    };
    

    return(
        <div className='AgregarUsuarios'>
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
        <div className='agregar'>
            <h1>Registrar usuario</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Contraseña"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
                />
                <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmContrasenia}
                onChange={(e) => setConfirmContrasenia(e.target.value)}
                required
                />
                <button type="submit">Registrar</button>
                <p className="resultado">{resultado}</p>
            </form>
        </div>
        </div>
    );
}
export default AgregarUsuario;