import react from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalheLivro.module.css'
import { BsBookmarkPlus } from "react-icons/bs";

function DetalheLivro() {
    const [resposta, setResposta] = useState({});
    const params = useParams();

    useEffect(() => {
        
        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + params.id).then(res => {
            setResposta(res.data);
            // console.log(res.data)
        });
    }, []);

    useEffect(()=>{
        resposta['items'] && console.log(resposta);
    },[resposta])


    return (
        <>
            <div className={styles.divMain}>
                <div className={styles.divImg}>
                {/* {resposta['items'] && resposta['items'][0]['volumeInfo']['imageLinks'] ? <img src={resposta['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>SEM<br />CAPA</h4>} */}
                {
                resposta['items'] && resposta['items'][0]['volumeInfo']['imageLinks'] ? <img src={resposta['items'][0]['volumeInfo']['imageLinks']['thumbnail']} alt='Foto'></img> :  <h4 style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '30px' }}>SEM<br />CAPA</h4>
                }
                </div>
                <div className={styles.divInfo}>
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['title']}</p>)}
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['authors']}</p>)}
                    {resposta['items'] && resposta['items'][0]['saleInfo']['listPrice'] ? (<p>R${resposta['items'][0]['saleInfo']['listPrice']['amount']}</p>) : (<p>Não está a venda</p>)}
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['categories']}</p>)}
                </div>
                <div className={styles.divBtnCheck}>
                    <BsBookmarkPlus></BsBookmarkPlus>
                </div>

            </div>
            <div className={styles.divDescricao}>
                {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['description']}</p>)}
            </div>
        </>
    )
}

export default DetalheLivro;