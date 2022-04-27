import * as React from 'react';
import Usuario from '../card-usuario/Usuario';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import styles from './Home.module.css'
import context from '../GlobalVariables';
import { BsBookmarkPlus } from "react-icons/bs";
import { AiOutlineBook, AiFillBook } from "react-icons/ai";
import {  Button } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";


function Home() {

    const [resposta, setResposta] = useState({});
    const [searchBookParam, setSearchBookParam] = useState('Harry%20Potter');
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        usuario['user'] && alert(usuario['user']['email']);
        console.log(usuario);
    }, [usuario])

    useEffect(() => {
        setSearchBookParam(parametroDeBusca)
    }, [parametroDeBusca])

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBookParam.replace(' ', "%20")}`).then(res => {
            setResposta(res.data);
        });
    }, [searchBookParam])

    async function detalhelivro() {

        // const result = await signInWithPopup(auth, provider)
        // await setUsuario(result);
        // navigate(`/detalhelivro/${val['id']}`);
    }


    return (
        <>
            <small>Todos os livros nesta página são e-books encontrados na Google Play Livros</small>
            <div className="App">
                <table>
                    <tr>
                        <th>Capa</th>
                        <th>Livro</th>
                        <th>Preço</th>
                        <th> </th>
                    </tr>

                    {resposta['items'] && resposta['items'].map((val, key) => {
                        return (
                            <tr key={key}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <td>{val['volumeInfo']['imageLinks'] ? <img onClick={() => { navigate(`/detalhelivro/${val['id']}`); }} src={val['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 onClick={() => { navigate(`/detalhelivro/${val['id']}`); }} style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>SEM<br />CAPA</h4>}</td>
                                    {/* <td>{val['volumeInfo']['imageLinks'] ? <img onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} src={val['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>SEM<br />CAPA</h4>}</td> */}
                                </div>
                                <td>{val['volumeInfo']['title']}</td>
                                {val['saleInfo']['listPrice'] ? (<td>R${val['saleInfo']['listPrice']['amount']}</td>) : (<td>Não está a venda</td>)}
                                <td>
                                    <Button><BsBookmarkPlus onClick={() => {navigate(`/detalhelivro/${val['id']}`)}}/></Button>
                                </td>
                                
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )

}

export default Home;