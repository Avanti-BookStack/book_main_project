import Home from './pages/Home/Home';
import './components/Header/Header.module.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login';
import Cadastro from './pages/Register/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/cadastre-se" element={<Cadastro/>}/>
      </Routes>
      
    </BrowserRouter>
  );
};

export default App;
