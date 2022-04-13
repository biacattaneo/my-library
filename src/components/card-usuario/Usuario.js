import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from "react-icons/ai";
import styles from './Usuario.module.css'


function Usuario({ name, bio, tempo }) {

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
                    <p>Nome: {name}</p>
                    <p>Bio: {bio}</p>
                    <p>Aqui desde:{tempo}</p>
                    <button className={styles.btnPerfilFinancas} value=''>Suas finanças literárias</button>
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