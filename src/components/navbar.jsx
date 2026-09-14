import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          English Academy
        </Link>
        <div className="space-x-4 font-semibold">
          <Link to="/" className="hover:text-blue-200 transition-colors">Inicio</Link>
          <Link to="/levels" className="hover:text-blue-200 transition-colors">Niveles</Link>
          <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  );
};