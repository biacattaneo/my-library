import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, child, set } from "firebase/database";
import { Tabs, Tab, Box, Button, Typography } from '@mui/material';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styles from './Grupos.module.css';
import context from '../GlobalVariables';


function Grupos() {
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [grupos, setGrupos] = useState([]);
    const [perfil, setPerfil] = useState({});
    const [nomeGrupo, setNomeGrupo] = useState('');
    const [descGrupo, setDescGrupo] = useState('');
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        boxShadow: '1px 1px 1.5px black',
        p: 4
    };

    useEffect(() => {
        if ((usuario?.user?.uid !== '') && (usuario?.user?.uid.lenght !== 0)) {
            get(child(dbRef, `usuarios/${uid}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setPerfil(snapshot.val());
                    listarGrupos();
                    entrarEmGrupo();

                } else {
                    console.log("No data available");
                }
            })
        }
        else {
            navigate('/login');
        }
    }, [uid])

    function listarGrupos() {
        get(child(dbRef, `grupos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setGrupos(snapshot.val());

            } else {
                console.log("No data available");
            }
        })
    }
    useEffect(() => { grupos.map((i, index) => { console.log(i) }) }, [grupos])

    function entrarEmGrupo(id) {
        console.log(grupos[id]);
        let usuarios = [];
        get(child(dbRef, `grupos/${id}/usuarios`)).then((snapshot) => {
            if (snapshot.exists()) {
                usuarios = snapshot.val();
                if (usuario?.user?.uid) {
                    usuarios = [...usuarios, usuario?.user?.uid];
                    set(ref(db, `grupos/${id}/usuarios`), usuarios);
                    listarGrupos();
                }
                console.log(usuarios);

            } else {
                console.log("No data available");
            }
        })
    }
    function sairDoGrupo(id) {
        console.log(grupos[id]);
        let usuarios = [];
        get(child(dbRef, `grupos/${id}/usuarios`)).then((snapshot) => {
            if (snapshot.exists()) {
                usuarios = snapshot.val();
                if (usuario?.user?.uid) {
                    usuarios = usuarios.filter(elemento => elemento != usuario.user.uid);
                    if (usuarios.length == 0) {
                        console.log('é zero.');
                        set(ref(db, `grupos/${id}`), null);
                    } else {
                        set(ref(db, `grupos/${id}/usuarios`), usuarios);
                        listarGrupos();
                    }
                    set(ref(db, `grupos/${id}/usuarios`), usuarios);
                    listarGrupos();
                }
                console.log(usuarios);

            } else {
                console.log("No data available");
            }
        })
    }
    function criarGrupo(nomeGrupo, descGrupo) {
        get(child(dbRef, `grupos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Já existe algum grupo cadastrado lá. incrementar..")
                let grupo = snapshot.val();
                grupo = [...grupo, { descricao: descGrupo, nome: nomeGrupo, usuarios: [usuario.user.uid] }];
                // console.log(grupo);
                set(ref(db, `grupos`), grupo);


            } else {
                console.log("Não tem nenhum grupo hoje lá :/");
                let grupo = [{ descricao: descGrupo, nome: nomeGrupo, usuarios: [usuario.user.uid] }];
                set(ref(db, `grupos`), grupo);
            }
            listarGrupos();
        })
    }

    return (
        <>
            <div className="groupCard">
                <h1 id='h1'>Grupos disponíveis</h1>
                <div>
                    <div className={styles.criarGrupo}>
                        Não encontrou nenhum grupo interessante? Crie o seu! <AiOutlineUsergroupAdd onClick={() => { setOpen(true) }}></AiOutlineUsergroupAdd>
                    </div>
                    <ModalUnstyled
                        open={open}
                        onClose={() => { setOpen(false) }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        disableEscapeKeyDown={false}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Crie seu grupo.
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                <p>Nome do grupo:</p>
                                <input onChange={(e) => { setNomeGrupo(e.target.value) }} style={{ width: 250 }} placeholder='Grupo para ler livro (..)' type="text"></input>
                                <p>Descrição do grupo:</p>
                                <input onChange={(e) => { setDescGrupo(e.target.value) }} style={{ width: 250 }} placeholder='Esse grupo tem como objetivo (..)' type="text"></input>
                                <Button style={{ marginTop: 20 }} variant="outlined" onClick={() => { criarGrupo(nomeGrupo, descGrupo) }}>Cadastrar grupo</Button>
                            </Typography>
                        </Box>
                    </ModalUnstyled>
                </div>
                <div id="groups" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                    {grupos && grupos.map((resultado, index) => {
                        return (
                            <>
                                <div id="eachGroup" className={styles.eachGroup}>
                                    <div id="header" className={styles.header} >
                                        <p style={{ margin: 0, marginLeft: 5 }}>{resultado?.nome}</p>
                                    </div>
                                    <div id="body" className={styles.body} >
                                        <p style={{ margin: 0, marginLeft: 5, textAlign: 'left' }}>{resultado?.descricao}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                                            {resultado?.usuarios ? <p style={{ margin: 0, marginLeft: 5 }}>Este grupo tem {Object.values(resultado?.usuarios).length} usuário(s).</p> : <p style={{ margin: 0 }}>Este grupo ainda não tem nenhum usuário.</p>}
                                            {(resultado?.usuarios?.find(element => element == usuario?.user?.uid)) ?
                                                <button onClick={() => { sairDoGrupo(index) }} style={{ marginRight: 5, marginBottom: 10, height: 25 }}>Sair</button>
                                                :
                                                <button onClick={() => { entrarEmGrupo(index) }} style={{ marginRight: 5, marginBottom: 10, height: 25 }}>Entrar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>)
                    })}

                </div>
            </div>

        </>
    )
}

export default Grupos;