import styles from './DetalhePerfilFinancas.module.css'

function DetalhePerfilFinancas (){
    return(
        <>
        <h2>Queremos te conhecer um pouco</h2>
            <form className={styles.formConhecer}>
                <p><label className={styles.labelConhecer}>Quanto você pode gastar por mês com livros? </label></p>
                <p><input type='number' name='' className={styles.campo} id='' require /></p>

                <p><label className={styles.labelConhecer}>Preferência </label></p>
                <p><input type='radio' name='' className={styles.radioConhecer} id='' require />Físico</p>
                <p><input type='radio' name='' className={styles.radioConhecer} id='' require />E-book</p>
                <p><input type='radio' name='' className={styles.radioConhecer} id='' require />Ambos</p>

                <p><label className={styles.labelConhecer}>Crie uma lista de prioridades </label></p>
                <select className={styles.selectConhecer}>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                </select>

                <p><label className={styles.labelConhecer} >Caso o saldo do mês não seja gasto, deseja que ele seja acumulado ou descartado?<br/> Colocamos como descartado como padrão, para evitar compras excessivas sem planejamento</label></p>
                <p><input type='radio' name='' className={styles.radioConhecer} id='' require />Acumulado</p>
                <p><input type='radio' name='' className={styles.radioConhecer} id='' require />Descartado</p>

                <input type='submit' value='Enviar'className={styles.buttonConhecer}></input>    
            </form>
        </>
    )
}

export default DetalhePerfilFinancas;