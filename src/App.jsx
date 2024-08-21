import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Register/Register';
import BookList from './pages/BookList/BookList'; // Novo import

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastre-se" element={<Cadastro />} />
        <Route path="/buscar-livros" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
