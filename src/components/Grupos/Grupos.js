import {useEffect, useState, useContext} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, child, set} from "firebase/database";
import styles from './Grupos.module.css';
import context from '../GlobalVariables';


function Grupos(){
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    const [parametroDeBusca, setparametroDeBusca, usuario, setUsuario] = useContext(context);
    const [uid, setUid] = useState('');
    const [grupos, setGrupos] = useState([]);
    const [perfil, setPerfil] = useState({});
    const navigate = useNavigate();
    
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
        else{
            navigate('/login');
        }
    }, [uid])

    function listarGrupos(){
        get(child(dbRef, `grupos/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setGrupos(snapshot.val());

            } else {
                console.log("No data available");
            }
        })
    }
    useEffect(()=>{grupos.map((i,index) => {console.log(i)})},[grupos])
    
    function entrarEmGrupo(id){
        console.log(grupos[id]);
        let usuarios = [];
        get(child(dbRef, `grupos/${id}/usuarios`)).then((snapshot) => {
            if (snapshot.exists()) {
                usuarios = snapshot.val();
                if(usuario?.user?.uid){
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
    function sairDoGrupo(id){
        console.log(grupos[id]);
        let usuarios = [];
        get(child(dbRef, `grupos/${id}/usuarios`)).then((snapshot) => {
            if (snapshot.exists()) {
                usuarios = snapshot.val();
                if(usuario?.user?.uid){
                    usuarios = usuarios.filter(elemento => elemento != usuario.user.uid);
                    if(usuarios.length == 0){
                        console.log('é zero.');
                        set(ref(db, `grupos/${id}`), null);
                    }else{
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

    return(
        <>
        <div className="groupCard">
            <h1>Grupos disponíveis</h1>
            <div id="groups" style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>

                {grupos && grupos.map((resultado, index) => {
                    return(
                    <>
                        <div id="eachGroup" style={{marginBottom: 20, boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.45)'}}>
                            <div id="header" style={{backgroundColor: 'red', width: '500px', textAlign: 'left'}}>
                            <p style={{margin: 0, marginLeft: 5}}>{resultado?.nome}</p>
                            </div>
                            <div id="body" style={{backgroundColor:'white', width: '500px'}}>
                                <p style={{margin: 0, marginLeft: 5,  textAlign: 'left'}}>{resultado?.descricao}</p>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                    
                                    {resultado?.usuarios ? <p style={{margin: 0, marginLeft: 5}}>Este grupo tem {Object.values(resultado?.usuarios).length} usuário(s).</p> : <p style={{margin: 0}}>Este grupo ainda não tem nenhum usuário.</p>}
                                    {(resultado?.usuarios?.find(element => element == usuario?.user?.uid)) ? 
                                        <button onClick={()=>{sairDoGrupo(index)}} style={{marginRight: 5, marginBottom: 10,  height: 25}}>Sair</button>
                                    :
                                        <button onClick={()=>{entrarEmGrupo(index)}} style={{marginRight: 5, marginBottom: 10,  height: 25}}>Entrar</button>
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