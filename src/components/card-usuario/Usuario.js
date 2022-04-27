import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import styles from './Usuario.module.css';
import context from '../GlobalVariables';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get, child } from "firebase/database";


function Usuario({ name, bio, tempo }) {
    const dbRef = ref(getDatabase());
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [perfil, setPerfil] = useState({});

    //Name = nome do usuario
    //bio = descricao colocada pelo usuário (opcional)
    //tempo = desde quando o usuario usa a plataforma
    useEffect(() => {
        if (usuario['user']['uid']) {
            setUid(usuario['user']['uid']);
        }
    }, [usuario])
    
    useEffect(() => {
        console.log(perfil);
        if (uid != '' && Object.keys(perfil).length === 0) {
            get(child(dbRef, `usuarios/${uid}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    setPerfil(snapshot.val());
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [perfil])

    return (
        <>
            <div className={styles.userCard}>
                <div className={styles.perfil}>
                    <div>
                        <AiOutlineUser />
                    </div>
                    {usuario['user']['displayName'] && <p>Nome: {usuario['user']['displayName']}</p>}
                    {perfil.perfil && perfil.perfil.bio ? <p>Bio: {perfil.perfil.bio} </p> : <p>Este usuário não tem bio cadastrada :(</p>}
                    <p>Aqui desde:{tempo}</p>
                    <button className={styles.btnPerfilFinancas} value='' ><Link to='/detalhePerfilFinancas'>Suas finanças literárias</Link></button>
                </div>
                <div className={styles.library}>
                    {/* cardgrupo  */}
                    <h3>Lidos</h3>
                    <div>
                        {perfil.livrosLidos ? <p>{perfil.livrosLidos}</p> : <p>Esta categoria ainda está vazia</p>}
                    </div>
                    <h3>Quero ler</h3>
                    <div>
                        {perfil.livrosQueroLer ? <p>{perfil.livrosQueroLer}</p> : <p>Esta categoria ainda está vazia</p>}
                    </div>
                    <h3>Favoritos</h3>
                    <div>
                        {perfil.livrosFavoritos ? <p>{perfil.livrosFavoritos}</p> : <p>Esta categoria ainda está vazia</p>}
                    </div>
                    <h3>Tenho</h3>
                    {/* <small>Quanto vale minha estante: </small> */}
                    <div>
                        {perfil.livrosTenho ? <p>{perfil.livrosTenho}</p> : <p>Esta categoria ainda está vazia</p>}
                    </div>
                    <h3>Quero ter</h3>
                    <div>
                        {perfil.livrosQueroTer ? <p>{perfil.livrosLidos}</p> : <p>Esta categoria ainda está vazia</p>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuario;