import React, { Suspense } from 'react';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import Home from './components/Home/Home';
import Book from './components/book/Book';
import Login from './components/Login/Login';
import DetalhePerfilFinancas from './components/DetalhePerfilFinancas/DetalhePerfilFinancas';
import { AiOutlineHistory } from "react-icons/ai";
import Cadastro from './components/Cadastro/Cadastro';

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
                        {/* <Route path='/perfilusuario'element={} /> */}
                        {/* <Route path='/detalhelivro' element={<Book/>} /> */}
                        {/* <Route path='/grupos'element={<Home/>} /> */}
                        <Route path='*' element={<h1>Página não encontrada</h1>} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default Rotas;