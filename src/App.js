import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Rotas from './Rotas';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <h1>Hi</h1>
      <Rotas />
      <Footer></Footer>
    </div>
  );
}

export default App;
