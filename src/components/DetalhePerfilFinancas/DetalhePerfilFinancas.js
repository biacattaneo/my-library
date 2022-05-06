import styles from './DetalhePerfilFinancas.module.css'
import { getDatabase, ref, get, set, child } from "firebase/database";
import context from '../GlobalVariables';
import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function DetalhePerfilFinancas() {
    const dbRef = ref(getDatabase());
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [perfil, setPerfil] = useState({});

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // useEffect(() => { console.log(perfil?.livrosQueroTer); }, [perfil])
    useEffect(() => {
        if (usuario?.user?.uid) {
            setUid(usuario['user']['uid']);
        }
    }, [usuario])

    useEffect(() => {
        if ((uid !== '') && (uid.lenght !== 0)) {
            get(child(dbRef, `usuarios/${uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    // console.log(snapshot.val());
                    // console.log('uid ->' + uid);
                    setPerfil(snapshot.val());
                    // writeUserDataPrioridade()


                } else {
                    console.log("No data available");
                }
            })
        }
    }, [uid])

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //////////////////////////////////////
    // ADICIONANDO UM A PRIORIDADE
    function writeUserDataPrioridade() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/perfil/`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            console.log(result);
            // console.log(result);
            // result = { ...result, [params.id]: [resposta['items'][0]['volumeInfo']['title']] };
            // console.log(result);
            // set(ref(db, `usuarios/${usuario.user.uid}/livrosFavoritos`), result);
        })
    }


    return (
        <>
            <h2>Queremos te conhecer um pouco</h2>
            <form className={styles.formConhecer}>
                <p><label className={styles.labelConhecer}>Quanto você pode gastar por mês com livros? </label></p>
                <p><input type='number' name='PossivelGastar' className={styles.campoSaldoMensal} id='PossivelGastar' require /></p>

                {/* <p><label className={styles.labelConhecer}>Preferência </label></p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisico' require />Físico</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebook' require />E-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='audiobook' require />Audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoebook' require />Fisico e e-book</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='fisicoaudio' require />Fisico e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='ebookaudio' require />E-book e audiobook</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='todos' require />Todos</p>
                <p><input type='radio' name='tipoLivro' className={styles.radioConhecer} id='todos' require />Ambos</p> */}

                <p><label className={styles.labelConhecer}>Crie uma lista de prioridades </label></p>
                <div>
                    <label>1º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>
                    <label> Preço </label>
                    <input type='number' name='precoPrio1' className={styles.campoPrecoPrioridade} id='precoPrio1' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio1' className={styles.campoLojaPrioridade} id='lojaPrio1' />
                </div>

                <div>
                    <label> 2º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>
                    <label> Preço </label>
                    <input type='number' name='precoPrio2' className={styles.campoPrecoPrioridade} id='precoPrio2' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio2' className={styles.campoLojaPrioridade} id='lojaPrio2' />
                </div>

                <div>
                    <label> 3º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio3' className={styles.campoPrecoPrioridade} id='precoPrio3' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio3' className={styles.campoLojaPrioridade} id='lojaPrio3' />
                </div>

                <div>
                    <label> 4º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio4' className={styles.campoPrecoPrioridade} id='precoPrio4' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio4' className={styles.campoLojaPrioridade} id='lojaPrio4' />
                </div>

                <div>
                    <label> 5º </label>
                    <select className={styles.selectConhecer}>
                        {perfil?.livrosQueroTer && (Object.entries(perfil.livrosQueroTer).map(i => { return (<option key={i[1]} value={i[0]}>{i[1]}</option>) }))}
                    </select>

                    <label> Preço </label>
                    <input type='number' name='precoPrio5' className={styles.campoPrecoPrioridade} id='precoPrio5' require />
                    <label> Loja (opcional) </label>
                    <input type='text' name='lojaPrio5' className={styles.campoLojaPrioridade} id='lojaPrio5' require />
                </div>

                <p><label className={styles.labelConhecer} >Caso o saldo do mês não seja gasto, deseja que ele seja acumulado ou descartado?<br /> <small>Colocamos como descartado como padrão, para evitar compras excessivas sem planejamento</small></label></p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Acumulado</p>
                <p><input type='radio' name='saldoMensal' className={styles.radioConhecer} id='' require />Descartado</p>

                {/* <input type='submit' value='Enviar' className={styles.buttonConhecer}></input> */}
                <button className={styles.buttonConhecer} onClick={(e) => { e.preventDefault(); handleOpen() }} value='Enviar'> Enviar</button>
            </form>
            <div>
                {/* <Button onClick={handleOpen}>Open modal</Button> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Previsão
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            REGRAS DO BANCO
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    )
}

export default DetalhePerfilFinancas;