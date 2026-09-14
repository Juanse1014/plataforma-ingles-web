import { useState } from 'react';
import { LessonCard } from '../components/LessonCard';

export const Levels = () => {
  // Estado para controlar qué nivel está activo
  const [activeLevel, setActiveLevel] = useState('A1');

  // Datos simulados (esto después vendrá de tu API en MongoDB)
  const levelsData = {
    'A1': [
      { id: 1, title: 'Verb To Be', description: 'Aprende a presentarte y describir cosas básicas.', status: 'completed' },
      { id: 2, title: 'Present Simple', description: 'Habla sobre tus rutinas y hábitos diarios.', status: 'in-progress' },
      { id: 3, title: 'Vocabulary: Family', description: 'Aprende los miembros de la familia.', status: 'locked' }
    ],
    'A2': [
      { id: 4, title: 'Past Simple', description: 'Cuenta historias sobre tu pasado.', status: 'locked' },
      { id: 5, title: 'Future with Going To', description: 'Habla de tus planes a futuro.', status: 'locked' }
    ],
    'B1': [
      { id: 6, title: 'Present Perfect', description: 'Conecta el pasado con el presente.', status: 'locked' }
    ],
    'B2': [
      { id: 7, title: 'Conditionals', description: 'Aprende a usar If clauses (Zero, First, Second).', status: 'locked' }
    ]
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Ruta de Aprendizaje</h2>
      
      {/* Selector de Niveles (Tabs) */}
      <div className="flex justify-center space-x-2 mb-10 border-b border-gray-200 pb-2">
        {['A1', 'A2', 'B1', 'B2'].map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-6 py-2 font-semibold text-lg transition-colors rounded-t-lg ${
              activeLevel === level 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
            }`}
          >
            Nivel {level}
          </button>
        ))}
      </div>

      {/* Cuadrícula de Lecciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levelsData[activeLevel].map((lesson) => (
          <LessonCard 
            key={lesson.id}
            title={lesson.title}
            level={activeLevel}
            description={lesson.description}
            status={lesson.status}
          />
        ))}
      </div>
    </div>
  );
};