import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import firebase from '../config/server';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import context from '../GlobalVariables';


import { FcGoogle } from "react-icons/fc";
import { useState, useContext, useEffect } from "react";

function Login() {
    const provider = new GoogleAuthProvider();
    const [parametroDeBusca, setParametroDeBusca, usuario, setUsuario] = useContext(context);
    const [user, setUser] = useState({})
    const auth = getAuth();
    const dbRef = ref(getDatabase());
    async function logarGoogle() {

        const result = await signInWithPopup(auth, provider)
        await setUsuario(result);
        console.log(usuario);
    }
    
    useEffect(()=>{console.log(usuario)},[usuario]);

    return (
        <>
            <h2>Login</h2>
            <form className={styles.formLogin}>
                <p><label className={styles.labelLogin}>Email </label></p>
                <input type='email' name='emailLogin' id='emailLogin' className={styles.campo}></input>

                <p><label className={styles.labelLogin}>Senha </label></p>
                <input type='password' name='passwordLogin' id='passwordLogin' className={styles.campo}></input>

                <p><input type='submit' value='Entrar' className={styles.buttonLogin}></input></p>

            </form>
            <p><button onClick={() => { logarGoogle() }}>< FcGoogle />Google<Link to='/perfilUsuario'></Link></button></p>
            <p className={styles.labelNaoTem}>Não tem cadastro? Cadastre-se aqui <Link to='/cadastro'><AiOutlineUserAdd className={styles.CadastroIcon} /></Link></p>
            
        </>
    )
}

export default Login;