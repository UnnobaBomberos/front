import React from 'react';
import './App.css';
import Login from './components/pantallas/Login';
import MenuPrincipal from './components/pantallas/MenuPrincipal';
import MenuMarcas from './components/pantallas/MenuMarcas';
import MenuModelos from './components/pantallas/MenuModelos';
import AgregarMarca from './components/pantallas/AgregarMarca';
import AgregarModelo from './components/pantallas/AgregarModelo';
import EditarMarca from './components/pantallas/EditarMarca';
import EditarModelo from './components/pantallas/EditarModelo';
import EliminarMarca from './components/pantallas/EliminarMarca';
import EliminarModelo from './components/pantallas/EliminarModelo';
import MostrarMarcas from './components/pantallas/MostrarMarcas';
import MostrarModelos from './components/pantallas/MostrarModelos';
import GestionUsuarios from './components/pantallas/GestionUsuarios';
import AgregarUsuarios from './components/pantallas/AgregarUsuario';
import MostrarUsuarios from './components/pantallas/MostrarUsuarios';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/menuprincipal" element={<MenuPrincipal/>}/>
            <Route path="/menuMarcas" element={<MenuMarcas />}/>
            <Route path="/menuModelos" element={<MenuModelos />}/>
            <Route path='/mostrarMarca' element={<MostrarMarcas/>}/>
            <Route path='/mostrarModelo' element={<MostrarModelos/>}/>
            <Route path="/agregarMarca" element={<AgregarMarca />}/>
            <Route path="/agregarModelo" element={<AgregarModelo />}/> 
            <Route path="/editarMarca" element={<EditarMarca />}/>
            <Route path="/editarModelo" element={<EditarModelo />} />
            <Route path="/eliminarMarca" element={<EliminarMarca />}/>
            <Route path="/eliminarModelo" element={<EliminarModelo />} />
            <Route path='/menuUsuarios' element={<GestionUsuarios/>}/>
            <Route path='/mostrarUsuarios' element={<MostrarUsuarios/>}/>
            <Route path='/agregarUsuario' element={<AgregarUsuarios/>}/>
          </Routes>
        </div>
      </Router>      
    </div>
  );
}
export default App;