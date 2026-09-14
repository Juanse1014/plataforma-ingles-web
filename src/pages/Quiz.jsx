import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Quiz = () => {
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Banco de preguntas de ejemplo (A1 - Verb To Be)
  const questions = [
    {
      questionText: 'Which one is correct for "I"?',
      answerOptions: [
        { answerText: 'am', isCorrect: true },
        { answerText: 'is', isCorrect: false },
        { answerText: 'are', isCorrect: false },
        { answerText: 'be', isCorrect: false },
      ],
    },
    {
      questionText: 'She _____ a doctor.',
      answerOptions: [
        { answerText: 'am', isCorrect: false },
        { answerText: 'is', isCorrect: true },
        { answerText: 'are', isCorrect: false },
        { answerText: 'does', isCorrect: false },
      ],
    },
    {
      questionText: '_____ they your friends?',
      answerOptions: [
        { answerText: 'Am', isCorrect: false },
        { answerText: 'Is', isCorrect: false },
        { answerText: 'Do', isCorrect: false },
        { answerText: 'Are', isCorrect: true },
      ],
    },
  ];

  // Lógica para procesar la respuesta
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

  const restartQuiz = () => {
    navigate('/levels');
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-72px)] bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        
        {showScore ? (
          /* Pantalla de Resultados */
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
              Volver a Niveles
            </button>
          </div>
        ) : (
          /* Pantalla de Preguntas */
          <div>
            <div className="mb-8 flex justify-between items-end border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Pregunta {currentQuestion + 1}
                <span className="text-lg text-gray-500 font-normal"> /{questions.length}</span>
              </h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                Verb To Be
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
                  className="w-full text-left p-4 text-gray-700 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-all font-medium text-lg"
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