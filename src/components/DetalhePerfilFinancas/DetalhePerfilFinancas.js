import styles from './DetalhePerfilFinancas.module.css'

function DetalhePerfilFinancas (){
    return(
        <>
        <h2>Queremos te conhecer um pouco</h2>
            <form className={styles.formConhecer}>
                <p><label className={styles.labelConhecer}>Quanto você pode gastar por mês com livros? </label></p>
                <p><input type='number' name='PossivelGastar' className={styles.campo} id='PossivelGastar' require /></p>

                <p><label className={styles.labelConhecer}>Preferência </label></p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisico' require />Físico</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebook' require />E-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='audiobook' require />Audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoebook' require />Fisico e e-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoaudio' require />Fisico e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebookaudio' require />E-book e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='todos' require />Todos</p>

                <p><label className={styles.labelConhecer}>Crie uma lista de prioridades </label></p>
                <label>1º </label>
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

                <label> 2º </label>
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
                </select>

                <label> 3º </label>
                <select className={styles.selectConhecer}>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                </select>

                <label> 4º </label>
                <select className={styles.selectConhecer}>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                </select>

                <label> 5º </label>
                <select className={styles.selectConhecer}>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                    <option value=''></option>
                </select>

                <p><label className={styles.labelConhecer} >Caso o saldo do mês não seja gasto, deseja que ele seja acumulado ou descartado?<br/> <small>Colocamos como descartado como padrão, para evitar compras excessivas sem planejamento</small></label></p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Acumulado</p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Descartado</p>

                <input type='submit' value='Enviar'className={styles.buttonConhecer}></input>    
            </form>
        </>
    )
}

export default DetalhePerfilFinancas;