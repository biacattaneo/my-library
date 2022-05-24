import {useEffect, useState, useContext} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, child } from "firebase/database";
import styles from './Grupos.module.css';
import context from '../GlobalVariables';


function Grupos(){
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [perfil, setPerfil] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        if ((uid !== '') && (uid.lenght !== 0)) {
            get(child(dbRef, `usuarios/${uid}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setPerfil(snapshot.val());

                } else {
                    console.log("No data available");
                }
            })
        }
        else{
            navigate('/login');
        }
    }, [uid])
    
    
    return(
        <>
        <div className="groupCard">
        </div>
        </>
    )
}

export default Grupos;