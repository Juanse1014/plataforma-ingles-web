import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Levels } from './pages/Levels';
import { Quiz } from './pages/Quiz'; // <--- 1. Importar Quiz

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/levels" element={<Levels />} />
          <Route path="/login" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} /> {/* <--- 2. Agregar la ruta */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;