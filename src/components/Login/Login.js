import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import firebase from '../config/server';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";
import context from '../GlobalVariables';


import { FcGoogle } from "react-icons/fc";
import { useState, useContext } from "react";

function Login() {
    const provider = new GoogleAuthProvider();
    const [usuario, setUsuario] = useContext(context);
    const auth = getAuth();
    const dbRef = ref(getDatabase());
    function logarGoogle() {
        let res;
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;;
                console.log(result);
                setUsuario(result);
                // return(user)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log(error);
                console.log("não logei" + errorCode + ':' + errorMessage + ':' + credential)
            });
        return 0;
    }

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
            <p><button onClick={() => { logarGoogle() }}>< FcGoogle />Google</button></p>
            <p className={styles.labelNaoTem}>Não tem cadastro? Cadastre-se aqui <Link to='/cadastro'><AiOutlineUserAdd className={styles.CadastroIcon} /></Link></p>
            {/* <button onClick={() => {
                get(child(dbRef, 'rNWGXfrVkKdCyJ3kZcKu6E73rB83')).then((data) => {
                    console.log(data.val());
                })

            }}>batata</button> */}
        </>
    )
}

export default Login;