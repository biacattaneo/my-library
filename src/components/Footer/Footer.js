import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { AiOutlineMail } from "react-icons/ai";

function Footer() {
    return (
        <div className={styles.teste} >
            <ul className={styles.list}>
                <li className={styles.item}>Desenvolvido por Beatriz Cattaneo <br/>Criado em 2022</li>
                <li className={styles.item}>Contato: <AiOutlineMail className={styles.emailIcon}/> biacattaneo2013@gmail.com</li>
                <li className={styles.item}>Tipo de licenciamento: GNU</li>
            </ul>
        </div>
    )
}

export default Footer;