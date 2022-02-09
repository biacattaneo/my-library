import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styles from './Header.module.css'
import { AiOutlineUser } from "react-icons/ai";

function Header() {
    return (
        <div className={styles.header}>
            <BrowserRouter>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <a href="/home">Home</a>
                        {/* <p><Link to='/home' >Home</Link></p> */}
                    </li>
                    <li className={styles.item}>
                        <a href="/grupos">Grupos</a>
                        {/* <Link to='/grupos'>Grupos</Link> */}
                    </li>
                    <li className={styles.item}>
                        <a href="/emprestedoe">Empreste/Doe</a>
                        {/* <Link to='/emprestedoe'>Empreste/Doe</Link> */}
                    </li>
                    <li className={styles.item}>
                        <a href="/comunidade">Comunidade</a>
                        {/* <Link to='/emprestedoe'>Empreste/Doe</Link> */}
                    </li>
                    <li>
                        <a href="/login"><AiOutlineUser className={styles.loginIcon} /></a>
                        {/* <Link to='/login'><AiOutlineUser className={styles.loginIcon} /></Link> */}
                    </li>
                </ul>
            </BrowserRouter>
        </div>
    )
}

export default Header;