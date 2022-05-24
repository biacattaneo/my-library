import './App.css';
import { useEffect } from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, createContext, useState } from 'react';
import Rotas from './Rotas';
import Footer from './components/Footer/Footer';
import MyContext from './components/GlobalVariables';

function App() {
  const [parametroDeBusca, setParametroDeBusca] = useState('');
  const [usuario, setUsuario] = useState({});
  const [grupos, setGrupos] = useState({});

  return (
    <BrowserRouter>
      <MyContext.Provider value={[parametroDeBusca, setParametroDeBusca, usuario, setUsuario, grupos, setGrupos]}>
        <div className="App">
          <Header></Header>
          <Rotas>
          </Rotas>
          <Footer></Footer>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );

}
export default App;
