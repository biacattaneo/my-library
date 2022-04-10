import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineUser} from "react-icons/ai";
import styles from './Usuario.module.css'


function Usuario({ name, bio, tempo }) {

    //Name = nome do usuario
    //bio = descricao colocada pelo usuário (opcional)
    //tempo = desde quando o usuario usa a plataforma
    return (
        <div className={styles.userCard}>
            <div className={styles.perfil}>
                <div>
                    <AiOutlineUser />
                </div>
                <p>Nome: {name}</p>
                <p>Bio: {bio}</p>
                <p>Aqui desde:{tempo}</p>
            </div>
            <div className={styles.library}>
                <p>texto</p>
            </div>
        </div>
    )
}

export default Usuario;