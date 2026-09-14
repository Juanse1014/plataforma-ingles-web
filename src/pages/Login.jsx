import { useState } from 'react';

export const Login = () => {
  // Estados para guardar los datos del formulario
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Función para actualizar el estado cuando el usuario escribe
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados para validar:', credentials);
    // Aquí más adelante conectarás tu API de Express/Node.js
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Iniciar Sesión
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              placeholder="estudiante@uniminuto.edu" 
              required 
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input 
              type="password" 
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
              </div>
              <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-500">Recordarme</label>
            </div>
            <a href="#" className="text-sm text-blue-700 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          
          <button 
            type="submit" 
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors"
          >
            Entrar a la plataforma
          </button>
        </form>
      </div>
    </div>
  );
};