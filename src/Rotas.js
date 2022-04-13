import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import DetalhePerfilFinancas from './components/DetalhePerfilFinancas/DetalhePerfilFinancas';
import { AiOutlineHistory } from "react-icons/ai";
import Cadastro from './components/Cadastro/Cadastro';
import Grupos from './components/Grupos/Grupos';
import DetalheLivro from './components/DetalheLivro/DetalheLivro';
import Usuario from './components/card-usuario/Usuario';

function Rotas() {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<AiOutlineHistory/>}>
                    <Routes>
                        <Route path='/' element={<Home/>} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/cadastro' element={<Cadastro />} />
                        <Route path='/detalhePerfilFinancas' element={<DetalhePerfilFinancas />} />
                        <Route path='/emprestedoe' element={<></>} />
                        <Route path='/perfilusuario' element={<Usuario />} />
                        <Route path='/detalhelivro/:id' element={<DetalheLivro/>} />
                        <Route path='/grupos'element={<Grupos/>} />
                        <Route path='*' element={<h1>Página não encontrada</h1>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default Rotas;