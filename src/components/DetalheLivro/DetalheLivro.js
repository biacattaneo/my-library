import * as React from 'react';
import { useContext } from 'react';
import context from '../GlobalVariables';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetalheLivro.module.css';
import { BsBookmarkPlus, BsBookmarkPlusFill, BsBookmarkCheck, BsBookmarkCheckFill, BsFillBookmarkHeartFill, BsBookmarkDash, BsBookmarkX, BsBookmarkHeart, BsBookmarkDashFill, BsBookmarkXFill } from "react-icons/bs";
import { AiOutlineBook, AiFillBook } from "react-icons/ai";
import { Modal, Tabs, Tab, Box, Button, Typography } from '@mui/material';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import PropTypes from 'prop-types';
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
// import { initializeApp } from 'firebase-admin/app';
// import { database } from 'firebase-admin';




//BsBookmarkPlus - adicionar
//BsBookmarkPlusFill - adicionar preenchido
//BsBookmarkCheck - Lido
//BsBookmarkCheckFill - Lido preenchido
//BsBookmarkDash - Lendo 
//BsBookmarkDashFill - Lendo preenchido
//BsBookmarkPlus - Quero ler
//BsBookmarkPlusFill - Quero ler preenchido
//BsBookmarkX - abandonado
//BsBookmarkXFill - abandonado preenchido
//BsBookmarkHeart - Favorito
//BsFillBookmarkHeartFill - Favorito preenchido
//AiOutlineBook - Quero comprar
//AiFillBook - Tenho

function DetalheLivro() {
    const [resposta, setResposta] = useState({});
    const params = useParams();
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const dbRef = ref(getDatabase());
    const [fbIterator, setFbIterator] = useState({});

    useEffect(() => {

        axios.get('https://www.googleapis.com/books/v1/volumes?q=' + params.id).then(res => {
            setResposta(res.data);
            // console.log(res.data)
        });

        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosAbandonados`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFbIterator(snapshot.val());
                let it = snapshot.val();
                for (var i in it) {
                    console.log(i);
                    if (params.id === i) {
                        setBookmarkX(false);
                        console.log('abandonados');
                    }
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosLidos`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFbIterator(snapshot.val());
                let it = snapshot.val();
                for (var i in it) {
                    console.log(i);
                    if (params.id === i) {
                        setBookmarkCheck(false);
                        console.log('lidos');
                    }
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosQueroLer`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFbIterator(snapshot.val());
                let it = snapshot.val();
                for (var i in it) {
                    console.log(i);
                    if (params.id === i) {
                        setBookmarkPlus(false);
                        console.log('queroler');
                    }
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosLendo`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFbIterator(snapshot.val());
                let it = snapshot.val();
                for (var i in it) {
                    console.log(i);
                    if (params.id === i) {
                        setBookmarkDash(false);
                        console.log('lendo');
                    }
                }
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        // writeUserDataLido()

    }, []);

    useEffect(() => {
        resposta['items'] && console.log(resposta);
    }, [resposta])

    // function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // }

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

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    // export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [BookmarkCheck, setBookmarkCheck] = useState('false'); //Lido
    const [BookmarkPlus, setBookmarkPlus] = useState('false'); //Quero ler
    const [BookmarkDash, setBookmarkDash] = useState('false'); //Lendo
    const [BookmarkX, setBookmarkX] = useState('false'); //Abandonado

    function clickLido() {
        setBookmarkCheck(false);
        setBookmarkPlus(true);
        setBookmarkDash(true);
        setBookmarkX(true);
        writeUserDataLido();
    }

    function clickLendo() {
        setBookmarkCheck(true);
        setBookmarkPlus(true);
        setBookmarkDash(false);
        setBookmarkX(true);
        writeUserDataLendo();
    }

    function clickQueroLer() {
        setBookmarkCheck(true);
        setBookmarkPlus(false);
        setBookmarkDash(true);
        setBookmarkX(true);
        writeUserDataQueroLer();
    }

    function clickAbandonei() {
        setBookmarkCheck(true);
        setBookmarkPlus(true);
        setBookmarkDash(true);
        setBookmarkX(false);
        writeUserDataAbandonado();
    }

    const [OutlineBook, setAiOutlineBook] = useState('false'); //Tenho
    const [FillBook, setAiFillBook] = useState('false'); //Quero ter
    const [BookmarkHeart, setBookmarkHeart] = useState('false'); //Favorito


    function clickTenho() {
        setAiOutlineBook(false);
        setAiFillBook(true);
        // writeUserDataTenho();
    }

    function clickQueroTer() {
        setAiOutlineBook(true);
        setAiFillBook(false);
        // writeUserDataQueroTer();
    }

    function clickFavorito() {
        setBookmarkHeart(true);
        // writeUserDataFavoritos();
    }

    function writeUserDataLido() {
        const db = getDatabase();
        
        let result = {};        
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosLidos`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }

            result = snapshot.val();
            delete result[params.id];
            set(ref(db, `usuarios/${usuario.user.uid}/livrosLidos`), result);
            // result = { ...result, [params.id]: '' };
            // set(ref(db, `usuarios/${usuario.user.uid}/livrosLidos`), result);
        })
    }

    function writeUserDataLendo() {
        const db = getDatabase();
        let result = {};
        // Buscando livros lendo..
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosLendo`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            //Armazenando livros lendo..
            result = snapshot.val();
            result = { ...result, [params.id]: '' };
            console.log(result);
            set(ref(db, `usuarios/${usuario.user.uid}/livrosLendo`), result);
            
        })
        //////////////////////////////////////        
        // BUSCANDO DO LIVROS LIDOS PARA REMOVER SE EXISTIR...
        result = {};        
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosLidos`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }

            result = snapshot.val();
            delete result[params.id];
            set(ref(db, `usuarios/${usuario.user.uid}/livrosLidos`), result);
            // result = { ...result, [params.id]: '' };
            // set(ref(db, `usuarios/${usuario.user.uid}/livrosLidos`), result);
        })
         
    }
    function writeUserDataQueroLer() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosQueroLer`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            result = { ...result, [params.id]: '' };
            set(ref(db, `usuarios/${usuario.user.uid}/livrosQueroLer`), result);
        })
    }
    function writeUserDataAbandonado() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosAbandonados`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            result = { ...result, [params.id]: '' };
            set(ref(db, `usuarios/${usuario.user.uid}/livrosAbandonados`), result);
        })
    }
    function writeUserDataTenho() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosTenho`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            result = { ...result, [params.id]: '' };
            set(ref(db, `usuarios/${usuario.user.uid}/livrosTenho`), result);
        })
    }
    function writeUserDataQueroTer() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosQueroTer`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            result = { ...result, [params.id]: '' };
            set(ref(db, `usuarios/${usuario.user.uid}/livrosQueroTer`), result);
        })
    }

    function writeUserDataFavoritos() {
        const db = getDatabase();
        let result = {};
        get(child(dbRef, `usuarios/${usuario.user.uid}/livrosFavoritos`)).then((snapshot) => {
            if (!snapshot.exists()) {
                result = {};
            }
            // Retorno existe
            result = snapshot.val();
            console.log(result);
            // console.log(result);
            result = { ...result, [params.id]: '' };
            // console.log(result);
            set(ref(db, `usuarios/${usuario.user.uid}/livrosFavoritos`), result);
        })
    }

    return (
        <>
            <div className={styles.divMain}>
                <div className={styles.divImg}>
                    {/* {resposta['items'] && resposta['items'][0]['volumeInfo']['imageLinks'] ? <img src={resposta['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>SEM<br />CAPA</h4>} */}
                    {
                        resposta['items'] && resposta['items'][0]['volumeInfo']['imageLinks'] ? <img src={resposta['items'][0]['volumeInfo']['imageLinks']['thumbnail']} alt='Foto'></img> : <h4 style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '30px' }}>SEM<br />CAPA</h4>
                    }
                </div>
                <div className={styles.divInfo}>
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['title']}</p>)}
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['authors']}</p>)}
                    {resposta['items'] && resposta['items'][0]['saleInfo']['listPrice'] ? (<p>R${resposta['items'][0]['saleInfo']['listPrice']['amount']}</p>) : (<p>Não está a venda</p>)}
                    {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['categories']}</p>)}
                </div>
                <div className={styles.divBtnCheck}>
                    <BsBookmarkPlus onClick={handleOpen}></BsBookmarkPlus>
                    <ModalUnstyled
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        disableEscapeKeyDown={false}>
                        <Box sx={style}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Leitura" {...a11yProps(0)} />
                                <Tab label="Minha biblioteca" {...a11yProps(1)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                {BookmarkCheck ? <BsBookmarkCheck onClick={() => { clickLido(!BookmarkCheck) }} /> : <BsBookmarkCheckFill onClick={() => { clickLido(!BookmarkCheck) }} />} Lido<br />
                                {BookmarkDash ? <BsBookmarkDash onClick={() => { clickLendo(!BookmarkDash) }} /> : <BsBookmarkDashFill onClick={() => { clickLendo(!BookmarkDash) }} />} Lendo<br />
                                {BookmarkPlus ? <BsBookmarkPlus onClick={() => { clickQueroLer(!BookmarkPlus) }} /> : <BsBookmarkPlusFill onClick={() => { clickQueroLer(!BookmarkPlus) }} />} Quero ler<br />
                                {BookmarkX ? <BsBookmarkX onClick={() => { clickAbandonei(!BookmarkX) }} /> : <BsBookmarkXFill onClick={() => { clickAbandonei(!BookmarkX) }} />} Abandonado<br />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                {/* {OutlineBook ? <AiOutlineBook onClick={() => { setAiOutlineBook(!AiOutlineBook); }} /> : <AiFillBook onClick={() => { setAiFillBook(!AiOutlineBook); setAiOutlineBook(!AiOutlineBook) }} />} Quero ter<br /> */}
                                {/* {FillBook ? <AiFillBook onClick={() => { setAiFillBook(!AiFillBook) }} /> : <AiFillBookFill onClick={() => { setAiFillBook(!AiFillBook) }} />} Tenho<br /> */}
                                {/* {BookmarkHeart ? <BsBookmarkHeart onClick={() => { setBookmarkHeart(!BsBookmarkHeart) }} /> : <BsFillBookmarkHeartFill onClick={() => { setBookmarkHeart(!BsBookmarkHeart) }} />} Favorito<br /> */}
                                <AiOutlineBook /> Quero ter<br />
                                <AiFillBook /> Tenho<br />
                                <BsBookmarkHeart /> Favorito
                            </TabPanel>
                        </Box>
                    </ModalUnstyled>
                </div>

            </div>
            <div className={styles.divDescricao}>
                {resposta['items'] && (<p>{resposta['items'][0]['volumeInfo']['description']}</p>)}
            </div>
        </>
    )
}

export default DetalheLivro;