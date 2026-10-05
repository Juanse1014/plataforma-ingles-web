import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  // Buscamos si existe un usuario guardado en la memoria del navegador
  const user = JSON.parse(localStorage.getItem('user'));

  // Si no hay usuario, lo redirigimos al login y reemplazamos el historial
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, renderizamos la pantalla que solicitó
  return children;
};