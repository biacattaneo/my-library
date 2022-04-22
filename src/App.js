import './App.css';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {getDatabase, ref, child, get, set} from 'firebase/database';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, createContext, useState } from 'react';
import Rotas from './Rotas';
import Footer from './components/Footer/Footer';
import MyContext from './components/GlobalVariables';

function App() {
  const [parametroDeBusca, setParametroDeBusca] = useState('');
  const [usuario, setUsuario] = useState({});
  useEffect(()=>{
    const dbRef = ref(getDatabase());
    const db = getDatabase();
    // get(child(dbRef, 'Livros')).then((retorno) => {
    //   console.log(retorno.val());
    // }) // ID DA PESSOA
    set(ref(db, 'Livros' + '2'), {
      nome: 'CLarice lispector batata frita 2',
      pagina: 300
    });
  },[])
  return (
    <MyContext.Provider value={[parametroDeBusca, setParametroDeBusca, usuario, setUsuario]}>
      <div className="App">
        <Header></Header>
        <Rotas />
        <Footer></Footer>
      </div>
    </MyContext.Provider>
  );

}
export default App;
