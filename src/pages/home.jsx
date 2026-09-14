export const Home = () => {
  return (
    <div className="container mx-auto mt-10 p-5 text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Domina el Inglés a tu propio ritmo
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Aprende vocabulario, mejora tu gramática y practica con ejercicios interactivos estructurados desde el nivel A1 hasta el B2.
      </p>
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105">
        Empezar mi primera lección
      </button>
    </div>
  );
};