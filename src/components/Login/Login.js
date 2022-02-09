import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";

function Login(){
    return(
        <>
        <h2>Login</h2>
        <form className={styles.formLogin}>
            <p><label className={styles.labelLogin}>Email </label></p>
            <input type='email' name='emailLogin' id='emailLogin' className={styles.campo}></input>

            <p><label className={styles.labelLogin}>Senha </label></p>
            <input type='password' name='passwordLogin' id='passwordLogin' className={styles.campo}></input>
            
            <p><input type='submit' value='Entrar' className={styles.buttonLogin}></input></p>
        </form>
        <p className={styles.labelNaoTem}>Não tem cadastro? Cadastre-se aqui <Link to='/cadastro'><AiOutlineUserAdd className={styles.CadastroIcon}/></Link></p>
        </>
    )
}

export default Login;