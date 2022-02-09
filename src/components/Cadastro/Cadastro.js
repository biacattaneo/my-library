import styles from './Cadastro.module.css'

function Cadastro() {
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

                <input type='submit' value='Cadastrar'className={styles.buttonCadastro}></input>    
            </form>
        </>
    )
}

export default Cadastro;