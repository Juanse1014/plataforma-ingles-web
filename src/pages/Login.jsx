import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Limpiamos los espacios en blanco invisibles al inicio o al final
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    try {
      // Hacemos la petición con los datos limpios
      const response = await fetch(`http://localhost:3001/users?email=${cleanEmail}&password=${cleanPassword}`);
      const users = await response.json();
      
      console.log("Respuesta de la base de datos:", users); // Imprime lo que encuentra

      if (users.length > 0) {
        const user = users[0];
        localStorage.setItem('user', JSON.stringify(user));
        
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/levels');
        }
      } else {
        setError('Correo o contraseña incorrectos');
      }
    } catch (error) {
      console.error("Error en el login:", error);
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Correo Electrónico</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Ingresar
        </button>

        {/* Dejamos preparado el enlace para el autorregistro (Opción A) */}
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline font-medium">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
};