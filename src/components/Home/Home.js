import * as React from 'react';
import Usuario from '../card-usuario/Usuario';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import styles from './Home.module.css'
import context from '../GlobalVariables';
import { BsBookmarkPlus, BsBookmarkCheck, BsBookmarkDash, BsBookmarkX, BsBookmarkHeart } from "react-icons/bs";
import { AiOutlineBook, AiFillBook } from "react-icons/ai";
import { Modal, Tabs, Tab, Box, Button, Typography } from '@mui/material';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import PropTypes from 'prop-types';


//BsBookmarkPlus - adicionar
//BsBookmarkPlusFill - adicionar preenchido
//BsBookmarkCheck - Lido
//BsBookmarkCheckFill - Lido preenchido
//BsBookmarkDash - Lendo 
//BsBookmarkDashFill - Lendo preenchido
//BsBookmarkX - abandonado
//BsBookmarkXFill - abandonado preenchido
//BsBookmarkHeart - Favorito
//BsFillBookmarkHeartFill - Favorito preenchido
//AiOutlineBook - Quero comprar
//AiFillBook - Tenho

function Home() {

    const [resposta, setResposta] = useState({});
    const [searchBookParam, setSearchBookParam] = useState('Harry%20Potter');
    const [parametroDeBusca, setparametroDeBusca] = useContext(context);

    useEffect(() => {
        setSearchBookParam(parametroDeBusca)
    }, [parametroDeBusca])

    useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchBookParam.replace(' ', "%20")}`).then(res => {
            setResposta(res.data);
        });
    }, [searchBookParam])

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

    // function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // }

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

    return (
        <>
            <small>Todos os livros nesta página são e-books encontrados na Google Play Livros</small>
            <div className="App">
                <table>
                    <tr>
                        <th>Capa</th>
                        <th>Livro</th>
                        <th>Preço</th>
                        <th></th>
                    </tr>


                    {resposta['items'] && resposta['items'].map((val, key) => {
                        return (
                            <tr key={key}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <td>{val['volumeInfo']['imageLinks'] ? <img onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} src={val['volumeInfo']['imageLinks']['thumbnail']} alt='Foto' style={{ height: '120px', weight: '100px', backgroundSize: 'cover', overflow: 'hidden', backgroundPosition: 'center' }}></img> : <h4 onClick={() => { window.location.href = `/detalhelivro/${val['id']}` }} style={{ backgroundColor: 'rgba(45,24,24,0.8)', color: 'white', height: '120px', width: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>SEM<br />CAPA</h4>}</td>
                                </div>
                                <td>{val['volumeInfo']['title']}</td>
                                {val['saleInfo']['listPrice'] ? (<td>R${val['saleInfo']['listPrice']['amount']}</td>) : (<td>Não está a venda</td>)}
                                <td>
                                    <Button onClick={handleOpen}><BsBookmarkPlus /></Button>
                                </td>
                                <ModalUnstyled
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                    disableEscapeKeyDown={false}
                                >
                                    <Box sx={style}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Leitura" {...a11yProps(0)} />
                                            <Tab label="Minha biblioteca" {...a11yProps(1)} />
                                            {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                                        </Tabs>
                                        {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                                                Leitura
                                            </Typography> */}
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <BsBookmarkCheck />
                                            <BsBookmarkDash />
                                            <BsBookmarkX />
                                            <BsBookmarkHeart />
                                        </Typography>
                                    </Box>
                                    {/* <TabPanel value={value} index={0}>
                                        Item One
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        Item Two
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        Item Three
                                    </TabPanel> */}
                                </ModalUnstyled>
                            </tr>
                        )
                    })}
                </table>
            </div>
        </>
    )

}

export default Home;