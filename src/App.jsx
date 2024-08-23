import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Register/Register';
import BookList from './pages/BookList/BookList'; // Novo import
import Footer from './components/Footer/Footer';
import BookRegister from './pages/BookRegister/BookRegister';
import PerfilUser from './pages/Perfil/PerfilUser'
import About from './pages/About/About'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
        <Route path="/buscar-livros" element={<BookList />} />
        <Route path="/cadastrar-livro" element={<BookRegister />} /> 
        <Route path="/perfil" element={<PerfilUser />} /> 
        <Route path="/informacoes" element={<About />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};


export default App;
