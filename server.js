const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001; // Mantenemos el puerto para no cambiar nada en React

// Middlewares
app.use(cors());
app.use(express.json());

// Funciones para manipular la base de datos (db.json)
const readDB = () => JSON.parse(fs.readFileSync('./db.json', 'utf-8'));
const writeDB = (data) => fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));

// ==========================================
// MÓDULO DE USUARIOS
// ==========================================

// GET: Consultar todos los usuarios o hacer Login (filtrar por email)
app.get('/users', (req, res) => {
    const db = readDB();
    let users = db.users;

    // Lógica para el Login (filtrado por email y password en la query)
    if (req.query.email && req.query.password) {
        users = users.filter(u => u.email === req.query.email && u.password === req.query.password);
    } else if (req.query.email) {
        // Lógica para validación de registro (ver si existe el email)
        users = users.filter(u => u.email === req.query.email);
    }
    
    res.json(users);
});

// POST: Registrar un nuevo usuario
app.post('/users', (req, res) => {
    const db = readDB();
    const newUser = { 
        id: Date.now().toString(), // Generador de ID único
        ...req.body 
    };
    db.users.push(newUser);
    writeDB(db);
    res.status(201).json(newUser);
});

// DELETE: Eliminar un usuario
app.delete('/users/:id', (req, res) => {
    const db = readDB();
    db.users = db.users.filter(u => u.id !== req.params.id);
    writeDB(db);
    res.json({ message: "Usuario eliminado" });
});

// ==========================================
// MÓDULO DE LECCIONES Y PREGUNTAS
// ==========================================

// GET: Consultar lecciones
app.get('/lessons', (req, res) => {
    const db = readDB();
    res.json(db.lessons);
});

// GET: Consultar preguntas dinámicas
app.get('/questions', (req, res) => {
    const db = readDB();
    res.json(db.questions);
});

// PATCH: Actualizar el estado de una lección (Progreso del estudiante)
app.patch('/lessons/:id', (req, res) => {
    const db = readDB();
    const lessonIndex = db.lessons.findIndex(l => l.id === req.params.id);
    
    if (lessonIndex !== -1) {
        db.lessons[lessonIndex] = { ...db.lessons[lessonIndex], ...req.body };
        writeDB(db);
        res.json(db.lessons[lessonIndex]);
    } else {
        res.status(404).json({ error: "Lección no encontrada" });
    }
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`🚀 API REST ejecutándose en http://localhost:${PORT}`);
});