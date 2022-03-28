import React from 'react';
import Usuario from '../card-usuario/Usuario';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Home.module.css'
import { BsBookmarkPlus } from "react-icons/bs";

//BsBookmarkPlus - adicionar
//BsBookmarkPlusFill - adicionar preenchido
//BsBookmarkCheck - Lido
//BsBookmarkCheckFill - Lido preenchido
//BsBookmarkDash - Lendo 
//BsBookmarkDashFill - Lendo preenchido
//BsBookmarkX - abandonado
//BsBookmarkXFill - abandonado preenchido
//BsBookmarkHeart - Favorito
//BsFillBookmarkHeartFill - Favorito preenchido
//AiOutlineBook - Quero comprar
//AiFillBook - Tenho

function Home() {

    const [resposta, setResposta] = useState({});
    const [searchBookParam, setSearchBookParam] = useState('Homem Aranha');
    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBookParam}`).then(res => {
            setResposta(res.data);
        });
    }, [searchBookParam])

    useEffect(() => {
        console.log("oi2", resposta['items']);
    }, [resposta])

    useEffect(() => {
        var livro = prompt('Digite o livro que você quer.');
        setSearchBookParam(livro);  
    }, [])

    const [precos, setPrecos] = useState([]);
    useEffect(() => {
        if (resposta['kind']) {
            resposta['items'].map((i) => {
                try {
                    console.log(i['saleInfo']['listPrice']['amount']);
                    setPrecos([...precos, i['saleInfo']['listPrice']['amount']])

                } catch {
                    console.log('Não está a venda.')
                    setPrecos([...precos, 'Não está a venda'])
                }
            });

        }
    }, [resposta])

    return (
        <>
            <p>Home</p>
            <small>Todos os livros nesta página são e-books encontrados na Google Play Livros</small>
            <div className="App">
                <table>
                    <tr>
                        <th>Capa</th>
                        <th>Livro</th>
                        <th>Preço</th>
                        <th></th>
                    </tr>
                    {/* {resposta['items'] && <h1>{resposta['items'][0]['volumeInfo']['title']}</h1>} */}

                    {resposta['items'] && resposta['items'].map((val, key) => {
                        return (
                            <tr key={key}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <td>{val['volumeInfo']['imageLinks'] ? <img onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} src={val['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} style={{backgroundColor: 'rgba(45,24,24,0.8)',color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent:'center', alignItems:'center'}}>SEM<br/>CAPA</h4>}</td>
                                </div>
                                <td>{val['volumeInfo']['title']}</td>
                                {val['saleInfo']['listPrice'] ? (<td>R${val['saleInfo']['listPrice']['amount']}</td>) : (<td>Não está a venda</td>)}
                                <td><BsBookmarkPlus></BsBookmarkPlus></td>
                            </tr>
                        )

                    })}


                </table>
            </div>
        </>
    )
}

export default Home;