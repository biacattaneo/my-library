import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styles from './Header.module.css'
import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { TextField } from '@mui/material';
import { Glob } from "../../App";
import Home from '../Home/Home';
import MyContext from '../GlobalVariables';

function Header(props) {

    const [_searchBookParam, _setSearchBookParam] = useState('Harry%20Potter');
    useEffect(() => {
        setparametroDeBusca(_searchBookParam)
    }, [_searchBookParam])

    const [parametroDeBusca, setparametroDeBusca] = useContext(MyContext);

    return (
        <div className={styles.header}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    {/* <a href="/home">Home</a> */}
                    {/* <Link to='/home'>Home</Link> */}
                    <p><Link to='/home' >Home</Link></p>
                </li>
                <li className={styles.item}>
                    {/* <a href="/grupos">Grupos</a> */}
                    <Link to='/grupos'>Grupos</Link>
                </li>
                <li className={styles.item}>
                    {/* <a href="/emprestedoe">Empreste/Doe</a> */}
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
                    <a href="/login"><AiOutlineUser className={styles.loginIcon} /></a>
                    <Link to='/login'><AiOutlineUser className={styles.loginIcon} /></Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;