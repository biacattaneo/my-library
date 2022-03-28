import axios from 'axios';
import { useEffect, useState } from 'react';


function Usuario({ name, bio, tempo }) {
    const [resposta, setResposta] = useState({});
    const [precos, setPrecos] = useState([]);
    
    useEffect(() => {
        axios.get('https://www.googleapis.com/books/v1/volumes?q=harry').then(res => {
            setResposta(res.data);
        });
    }, [])

    useEffect(() => {
        if (resposta['kind']) {
            resposta['items'].map((i) => {
                try {
                    console.log(i['saleInfo']['listPrice']['amount']);
                    setPrecos([...precos, i['saleInfo']['listPrice']['amount']])

                } catch {
                    console.log('Não está a venda.')
                }
            });

        }
    }, [resposta])

    //Name = nome do usuario
    //bio = descricao colocada pelo usuário (opcional)
    //tempo = desde quando o usuario usa a plataforma
    return (
        <div className="userCard">
            <p>Usuario</p>
            <div>
                {/* <div>
                    <Images></Images>
                </div> */}
                <p>Nome: {name}</p>
                <p>Bio: {bio}</p>
                <p>Aqui desde:{tempo}</p>
                {precos.map((i, count) => {
                    return (<h1 key={count}>{i}</h1>)
                })}
            </div>
        </div>
    )
}

export default Usuario;