import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import firebase from '../config/server';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, set, child } from "firebase/database";
import context from '../GlobalVariables';
import { FcGoogle } from "react-icons/fc";
import { useState, useContext, useEffect } from "react";

function Login() {
    const provider = new GoogleAuthProvider();
    const [parametroDeBusca, setParametroDeBusca, usuario, setUsuario] = useContext(context);
    const [user, setUser] = useState({})
    const auth = getAuth();
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const navigate = useNavigate();

    async function logarGoogle() {

        const result = await signInWithPopup(auth, provider)
        await setUsuario(result);

        get(child(dbRef, `usuarios/${result.user.uid}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available.. making one");
                set(ref(db, `usuarios/${result.user.uid}`), {
                    "livrosAbandonados": "",
                    "livrosFavoritos": "",
                    "livrosLendo": "",
                    "livrosLidos": "",
                    "livrosQueroLer": "",
                    "livrosQueroTer": "",
                    "livrosTenho": "",
                    "perfil": {
                        "nome": result.user.displayName,
                        "bio": "Sou um leitor normal que gosta de cachorrinhos bonitos.",
                        "oQueFazerSaldoMensal": "Descartado",
                        "prioridade1": "",
                        "prioridade2": "",
                        "prioridade3": "",
                        "prioridade4": "",
                        "prioridade5": "",
                        "saldoMensal": 50
                    }
                })
            }
        }).catch((error) => {
            console.error(error);
        });

        // if (result.user.uid != null) {
        //     navigate('/perfilUsuario');
        // }
        // else {

        // }
    }
    // useEffect(() => { console.log(usuario) }, [usuario]);

    return (
        <>
            <h2>Entre ou cadastre-se</h2>
            {/* <form className={styles.formLogin}>
                <p><label className={styles.labelLogin}>Email </label></p>
                <input type='email' name='emailLogin' id='emailLogin' className={styles.campo}></input>

                <p><label className={styles.labelLogin}>Senha </label></p>
                <input type='password' name='passwordLogin' id='passwordLogin' className={styles.campo}></input>

                <p><input type='submit' value='Entrar' className={styles.buttonLogin}></input></p>

            </form> */}
            <p><button className={styles.buttonGoogle} onClick={() => { logarGoogle() }}>< FcGoogle /> Continuar com o Google</button></p>
            {/* <p className={styles.labelNaoTem}>Não tem cadastro? Cadastre-se aqui <Link to='/cadastro'><AiOutlineUserAdd className={styles.CadastroIcon} /></Link></p> */}

        </>
    )
}

export default Login;