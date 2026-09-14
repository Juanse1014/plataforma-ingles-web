import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LessonCard = ({ title, level, description, status }) => {
  const navigate = useNavigate(); // <--- Inicializar navegación
  
  const statusConfig = {
    'completed': { label: 'Completado', badgeClass: 'bg-green-100 text-green-800', borderClass: 'border-green-200', btnText: 'Repasar' },
    'in-progress': { label: 'En Progreso', badgeClass: 'bg-blue-100 text-blue-800', borderClass: 'border-blue-200', btnText: 'Continuar' },
    'locked': { label: 'Bloqueado', badgeClass: 'bg-gray-100 text-gray-800', borderClass: 'border-gray-200 opacity-60', btnText: 'Bloqueado' }
  };

  const config = statusConfig[status];
  const isLocked = status === 'locked';

  // Función para ir al Quiz
  const handleStartLesson = () => {
    if (!isLocked) {
      navigate('/quiz');
    }
  };

  return (
    <div className={`p-6 bg-white border ${config.borderClass} rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-4">
        <h5 className={`text-xl font-bold ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>{title}</h5>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${config.badgeClass}`}>{config.label}</span>
      </div>
      <p className={`mb-5 text-sm ${isLocked ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      
      <button 
        disabled={isLocked}
        onClick={handleStartLesson} // <--- Agregar evento click
        className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-colors ${
          isLocked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {config.btnText}
      </button>
    </div>
  );
};