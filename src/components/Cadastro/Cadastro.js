import styles from './Cadastro.module.css'
import { getDatabase, ref, set } from "firebase/database";
import {useEffect, useState ,useContext } from 'react';
import context from '../GlobalVariables';

function Cadastro() {

    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);

    useEffect(() => {
        usuario['user'] && alert(usuario['user']['email']);
        // console.log(usuario);
    }, [usuario])

    function writeUserData() {
        const db = getDatabase();
        set(ref(db, ''), {
            usuarios: usuario.user.uid
        });
    }

    return (
        <>
            <h2>Cadastro</h2>
            <form className={styles.labelCadastro}>
                <p><label>Nome </label></p>
                <p><input type='text' name='nameCadastro' className={styles.campo} id='nameCadastro' require /></p>

                <p><label>Email </label></p>
                <p><input type='email' name='emailCadastro' className={styles.campo} id='emailCadastro' require /></p>

                <p><label>Senha </label></p>
                <p><input type='password' name='passwordCadastro' className={styles.campo} id='passwordCadastro' require /></p>

                <input type='submit' value='Cadastrar' className={styles.buttonCadastro}></input>
            </form>
        </>
    )
}

export default Cadastro;