import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Link, Navigate, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { TextField } from '@mui/material';
import { Glob } from "../../App";
import Home from '../Home/Home';
import MyContext from '../GlobalVariables';
import context from '../GlobalVariables';

function Header(props) {

    const [_searchBookParam, _setSearchBookParam] = useState('Harry%20Potter');
    useEffect(() => {
        setparametroDeBusca(_searchBookParam)
    }, [_searchBookParam])

    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const navigate = useNavigate();

    useEffect(() => {
        // usuario['user'] && alert(usuario['user']['email']);
        console.log(usuario);
    }, [usuario])

    return (
        <div className={styles.header}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <Link to='/home' >Home</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/grupos'>Grupos</Link>
                </li>
                <li className={styles.item}>
                    <Link to='/emprestedoe'>Empreste/Doe</Link>
                </li>
                <li className={styles.item}>
                    {/* <a href="/comunidade">Comunidade</a> */}
                    {/* <Link to='/emprestedoe'>Empreste/Doe</Link> */}
                </li>
                <li className={styles.textBusca}>
                    <TextField id="outlined-basic" onChange={e => { _setSearchBookParam(e.target.value) }} className={styles.busca} label="Pesquisa.." variant="outlined" size="small" sx={{ marginTop: '5px', input: { color: 'rgb(45,24,24)' } }} />
                    <AiOutlineSearch className={styles.buscabtn} />
                </li>
                <li>
                    {!(usuario && usuario.user && usuario.user.email) ? <Link to='/login'><AiOutlineUser className={styles.loginIcon} /></Link> : <Link to='/perfilUsuario'><AiOutlineUser className={styles.loginIcon} /></Link> }
                </li>
            </ul>
        </div>  
    )
}

export default Header;