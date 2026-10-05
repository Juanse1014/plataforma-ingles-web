import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  // Leemos si hay un usuario activo en la memoria del navegador
  const user = JSON.parse(localStorage.getItem('user'));

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user'); // Borramos la memoria
    navigate('/login'); // Lo enviamos al login
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wider">
          English Academy
        </Link>
        <div className="space-x-4 font-semibold flex items-center">
          <Link to="/" className="hover:text-blue-200 transition-colors">Inicio</Link>
          
          {/* Mostramos Niveles solo si está logueado */}
          {user && (
            <Link to="/levels" className="hover:text-blue-200 transition-colors">Niveles</Link>
          )}

          {/* Renderizado condicional del panel de usuario */}
          {user ? (
            <div className="flex items-center space-x-4 ml-4 border-l border-blue-400 pl-4">
              {/* Validación doble por si la propiedad está como name o nombre */}
              <span className="text-blue-100 font-medium">
                Hola, {user.name || user.nombre}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition-colors ml-4">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};