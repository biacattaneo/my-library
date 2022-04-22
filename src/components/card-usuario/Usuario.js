import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import styles from './Usuario.module.css';
import context from '../GlobalVariables';
import {useContext} from 'react';
import { Link } from 'react-router-dom';



function Usuario({ name, bio, tempo }) {
    const [usuario, setUsuario] = useContext(context);
    console.log(usuario)

    //Name = nome do usuario
    //bio = descricao colocada pelo usuário (opcional)
    //tempo = desde quando o usuario usa a plataforma
    return (
        <>
            <div className={styles.userCard}>
                <div className={styles.perfil}>
                    <div>
                        <AiOutlineUser />
                    </div>
                    {/* <p>Nome: {usuario['user']['auth']['displayName']}</p> Não funcionando por causa do link, voltar depois */}
                    <p>Bio: {bio}</p>
                    <p>Aqui desde:{tempo}</p>
                    <button className={styles.btnPerfilFinancas} value='' ><Link to='/detalhePerfilFinancas'>Suas finanças literárias</Link></button>
                </div>
                <div className={styles.library}>
                    {/* cardgrupo  */}
                    <h3>Lidos</h3>
                    <div>

                    </div>
                    <h3>Quero ler</h3>
                    <div>

                    </div>
                    <h3>Favoritos</h3>
                    <div>

                    </div>
                    <h3>Tenho</h3>
                    <small>Quanto vale minha estante: </small>
                    <div>

                    </div>
                    <h3>Quero ter</h3>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuario;