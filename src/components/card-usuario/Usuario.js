import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import styles from './Usuario.module.css';
import context from '../GlobalVariables';
import { useContext } from 'react';
import { Link, Navigate, useNavigate} from 'react-router-dom';
import { getDatabase, ref, get, child } from "firebase/database";


function Usuario() {
    const dbRef = ref(getDatabase());
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [perfil, setPerfil] = useState({});
    const navigate = useNavigate();

    //Name = nome do usuario
    //bio = descricao colocada pelo usuário (opcional)
    //tempo = desde quando o usuario usa a plataforma
    useEffect(() => {
        if (usuario?.user?.uid) {
            setUid(usuario['user']['uid']);
        }
    }, [usuario])

    useEffect(() => {
        if ((uid !== '') && (uid.lenght !== 0)) {
            get(child(dbRef, `usuarios/${uid}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    // console.log('uid ->' + uid);
                    setPerfil(snapshot.val());

                } else {
                    console.log("No data available");
                }
            })
        }
        else{
            navigate('/login');
        }
    }, [uid])

    return (
        <>
            <div className={styles.userCard}>
                <div className={styles.perfil}>
                    <div>
                        <AiOutlineUser />
                    </div>
                    {usuario && usuario.user && usuario['user']['displayName'] && <p>Nome: {usuario['user']['displayName']}</p>}
                    {perfil && perfil.perfil && perfil.perfil.bio ? <p>Bio: {perfil.perfil.bio} </p> : <p>Este usuário não tem bio cadastrada :(</p>}
                    <p>Aqui desde:</p>
                    <button className={styles.btnPerfilFinancas} value='' ><Link to='/detalhePerfilFinancas'>Suas finanças literárias</Link></button>
                </div>
                <div className={styles.library}>
                    <h3>Lidos</h3>
                    <div>
                        {perfil && perfil.livrosLidos && Object.entries(perfil.livrosLidos).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Lendo</h3>
                    <div>
                        {perfil && perfil.livrosLendo && Object.entries(perfil.livrosLendo).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Quero ler</h3>
                    <div>
                        {perfil && perfil.livrosQueroLer && Object.entries(perfil.livrosQueroLer).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Abandonados</h3>
                    <div>
                        {perfil && perfil.livrosAbandonados && Object.entries(perfil.livrosAbandonados).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Favoritos</h3>
                    <div>
                        {perfil && perfil.livrosFavoritos && Object.entries(perfil.livrosFavoritos).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Tenho</h3>
                    {/* <small>Quanto vale minha estante: </small> */}
                    <div>
                        {perfil && perfil.livrosTenho && Object.entries(perfil.livrosTenho).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                    <h3>Quero ter</h3>
                    <div>
                        {perfil && perfil.livrosQueroTer && Object.entries(perfil.livrosQueroTer).map(([key, value]) => (
                            <>
                                <Link to={`/detalheLivro/${key}`} key={key}>{value}</Link><br />
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuario;