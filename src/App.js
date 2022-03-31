import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useContext, createContext, useState } from 'react';
import Rotas from './Rotas';
import Footer from './components/Footer/Footer';
import MyContext from './components/GlobalVariables'; 

function App() {
  const [parametroDeBusca, setParametroDeBusca] = useState('');

  return (
    <MyContext.Provider value={[parametroDeBusca, setParametroDeBusca]}>
      <div className="App">
        <Header></Header>
        <Rotas />
        <Footer></Footer>
      </div>
    </MyContext.Provider>
  );
  
}
export default App;
