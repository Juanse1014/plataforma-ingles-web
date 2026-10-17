import { useState, useEffect } from 'react';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [activeTab, setActiveTab] = useState('users');

  // Estados para controlar las ventanas emergentes (Modales)
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = Crear nuevo, ID = Editar

  // Estados para guardar los datos de los formularios
  const [userForm, setUserForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [lessonForm, setLessonForm] = useState({ level: 'A1', title: '', description: '', status: 'locked' });

  // --------------------------------------------------------
  // 1. CARGAR DATOS (GET)
  // --------------------------------------------------------
  const loadData = async () => {
    try {
      const resUsers = await fetch('http://localhost:3001/users');
      setUsers(await resUsers.json());
      
      const resLessons = await fetch('http://localhost:3001/lessons');
      setLessons(await resLessons.json());
    } catch (error) {
      console.error("Error cargando datos:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // --------------------------------------------------------
  // 2. ELIMINAR DATOS (DELETE)
  // --------------------------------------------------------
  const handleDeleteUser = async (id) => {
    if(window.confirm('¿Seguro que deseas eliminar este usuario?')) {
      await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  const handleDeleteLesson = async (id) => {
    if(window.confirm('¿Seguro que deseas eliminar esta lección?')) {
      await fetch(`http://localhost:3001/lessons/${id}`, { method: 'DELETE' });
      loadData();
    }
  };

  // --------------------------------------------------------
  // 3. GUARDAR USUARIO (POST / PUT)
  // --------------------------------------------------------
  const openUserForm = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setUserForm({ name: user.name || user.nombre, email: user.email, password: user.password, role: user.role || 'student' });
    } else {
      setEditingId(null);
      setUserForm({ name: '', email: '', password: '', role: 'student' });
    }
    setShowUserModal(true);
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:3001/users/${editingId}` : 'http://localhost:3001/users';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userForm)
    });
    
    setShowUserModal(false);
    loadData();
  };

  // --------------------------------------------------------
  // 4. GUARDAR LECCIÓN (POST / PUT)
  // --------------------------------------------------------
  const openLessonForm = (lesson = null) => {
    if (lesson) {
      setEditingId(lesson.id);
      setLessonForm({ level: lesson.level, title: lesson.title, description: lesson.description, status: lesson.status });
    } else {
      setEditingId(null);
      setLessonForm({ level: 'A1', title: '', description: '', status: 'locked' });
    }
    setShowLessonModal(true);
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:3001/lessons/${editingId}` : 'http://localhost:3001/lessons';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lessonForm)
    });
    
    setShowLessonModal(false);
    loadData();
  };

  // --------------------------------------------------------
  // INTERFAZ DE USUARIO (RENDER)
  // --------------------------------------------------------
  return (
    <div className="container mx-auto p-6 min-h-[calc(100vh-72px)] relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
      
      {/* Pestañas */}
      <div className="flex space-x-4 mb-6 border-b border-gray-300 pb-2">
        <button onClick={() => setActiveTab('users')} className={`font-semibold py-2 px-6 rounded-t-lg transition-colors ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Módulo Usuarios</button>
        <button onClick={() => setActiveTab('lessons')} className={`font-semibold py-2 px-6 rounded-t-lg transition-colors ${activeTab === 'lessons' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Módulo Lecciones</button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
        {/* TABLA DE USUARIOS */}
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Gestión de Usuarios</h2>
              <button onClick={() => openUserForm()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-medium">+ Registrar Usuario</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3 border-b">ID</th>
                    <th className="p-3 border-b">Nombre</th>
                    <th className="p-3 border-b">Email</th>
                    <th className="p-3 border-b">Rol</th>
                    <th className="p-3 border-b text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{user.id}</td>
                      <td className="p-3 border-b">{user.name || user.nombre}</td>
                      <td className="p-3 border-b">{user.email}</td>
                      <td className="p-3 border-b capitalize text-blue-600 font-semibold">{user.role || 'student'}</td>
                      <td className="p-3 border-b text-center space-x-2">
                        <button onClick={() => openUserForm(user)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Editar</button>
                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TABLA DE LECCIONES */}
        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-700">Gestión de Lecciones</h2>
              <button onClick={() => openLessonForm()} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-medium">+ Registrar Lección</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="p-3 border-b">ID</th>
                    <th className="p-3 border-b">Nivel</th>
                    <th className="p-3 border-b">Título</th>
                    <th className="p-3 border-b text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {lessons.map(lesson => (
                    <tr key={lesson.id} className="hover:bg-gray-50">
                      <td className="p-3 border-b">{lesson.id}</td>
                      <td className="p-3 border-b font-bold">{lesson.level}</td>
                      <td className="p-3 border-b">{lesson.title}</td>
                      <td className="p-3 border-b text-center space-x-2">
                        <button onClick={() => openLessonForm(lesson)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Editar</button>
                        <button onClick={() => handleDeleteLesson(lesson.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------- */}
      {/* VENTANA EMERGENTE (MODAL) DE USUARIOS             */}
      {/* ------------------------------------------------- */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Usuario' : 'Registrar Usuario'}</h2>
            <form onSubmit={handleUserSubmit}>
              <input type="text" placeholder="Nombre" required className="w-full mb-3 p-2 border rounded"
                value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} />
              <input type="email" placeholder="Correo" required className="w-full mb-3 p-2 border rounded"
                value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} />
              <input type="password" placeholder="Contraseña" required className="w-full mb-3 p-2 border rounded"
                value={userForm.password} onChange={e => setUserForm({...userForm, password: e.target.value})} />
              <select className="w-full mb-4 p-2 border rounded"
                value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})}>
                <option value="student">Estudiante</option>
                <option value="admin">Administrador</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowUserModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------- */}
      {/* VENTANA EMERGENTE (MODAL) DE LECCIONES            */}
      {/* ------------------------------------------------- */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Editar Lección' : 'Registrar Lección'}</h2>
            <form onSubmit={handleLessonSubmit}>
              <select className="w-full mb-3 p-2 border rounded"
                value={lessonForm.level} onChange={e => setLessonForm({...lessonForm, level: e.target.value})}>
                <option value="A1">Nivel A1</option>
                <option value="A2">Nivel A2</option>
                <option value="B1">Nivel B1</option>
              </select>
              <input type="text" placeholder="Título de la lección" required className="w-full mb-3 p-2 border rounded"
                value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} />
              <textarea placeholder="Descripción" required className="w-full mb-3 p-2 border rounded"
                value={lessonForm.description} onChange={e => setLessonForm({...lessonForm, description: e.target.value})} />
              <select className="w-full mb-4 p-2 border rounded"
                value={lessonForm.status} onChange={e => setLessonForm({...lessonForm, status: e.target.value})}>
                <option value="locked">Bloqueada (locked)</option>
                <option value="in-progress">En Progreso (in-progress)</option>
                <option value="completed">Completada (completed)</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowLessonModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};