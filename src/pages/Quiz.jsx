import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Quiz = () => {
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Consumo de la API Falsa (Ingeniería Web II)
  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando preguntas:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Función asíncrona para actualizar la base de datos y volver a Niveles
  const restartQuiz = async () => {
    try {
      await fetch('http://localhost:3001/lessons/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'completed' }),
      });
    } catch (error) {
      console.error("Error al actualizar el progreso:", error);
    }

    navigate('/levels');
  };

  // Pantalla de carga mientras trae los datos de la base de datos
  if (loading) {
    return <div className="flex items-center justify-center min-h-[calc(100vh-72px)] text-xl font-semibold text-blue-600">Cargando cuestionario desde la API...</div>;
  }

  // Si la base de datos no devuelve preguntas
  if (questions.length === 0) {
    return <div className="text-center mt-20 text-gray-500">No hay preguntas disponibles para esta lección.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        
        {showScore ? (
          <div className="text-center py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">¡Lección Completada!</h2>
            <div className="text-6xl mb-6">
              {score >= 2 ? '🎉' : '📚'}
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Obtuviste <span className="font-bold text-blue-600">{score}</span> de <span className="font-bold">{questions.length}</span> aciertos.
            </p>
            <button 
              onClick={restartQuiz}
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Guardar y Volver a Niveles
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Pregunta {currentQuestion + 1}
                <span className="text-lg text-gray-500 font-normal"> /{questions.length}</span>
              </h2>
              {/* Etiqueta visual para demostrar que viene de la API */}
              <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                Dinámico (JSON Server)
              </span>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl text-gray-700 font-medium">
                {questions[currentQuestion].questionText}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option.isCorrect)}
                  className="w-full text-left p-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-purple-50 hover:border-purple-500 hover:text-purple-700 transition-all font-medium text-lg"
                >
                  {option.answerText}
                </button>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};