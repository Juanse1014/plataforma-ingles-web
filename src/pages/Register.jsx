import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Verificamos que el correo no exista ya en la base de datos
    try {
      const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
      const existingUsers = await checkResponse.json();

      if (existingUsers.length > 0) {
        setError('Este correo electrónico ya está registrado.');
        return;
      }

      // 2. Si no existe, creamos el nuevo usuario con rol de estudiante
      const newUser = {
        name: name,
        email: email,
        password: password,
        role: "student"
      };

      const createResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (createResponse.ok) {
        setSuccess(true);
        // Esperamos 2 segundos y lo enviamos al Login
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      setError('Error de conexión con el servidor. Inténtalo más tarde.');
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-72px)] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear una Cuenta</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4 text-center bg-green-50 p-2 rounded">¡Registro exitoso! Redirigiendo al login...</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Nombre Completo</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required 
          />
        </div>

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
          disabled={success}
          className={`w-full text-white font-bold py-2 px-4 rounded transition-colors ${success ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {success ? 'Registrando...' : 'Registrarme'}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline font-medium">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
};