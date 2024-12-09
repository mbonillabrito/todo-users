import React from 'react'
import './App.js'
import  { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Crear from './componentes/Crear.js'
import Inicio from './componentes/Inicio.js'
import Actualizar from './componentes/Actualizar.js'
import Leer from './componentes/Leer.js'
// import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Inicio}  exact  > </Route>
        <Route path='/crear' Component={Crear}    > </Route>
        <Route path='/actualizar/:id' Component={Actualizar}   > </Route> /*Ruta dinamica */
        <Route path='/leer/:id' Component={Leer}   > </Route> /*Ruta dinamica */
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
