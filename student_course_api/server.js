import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pool from './db.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoints

// Student Endpoints

// Create a new student
app.post('/students', async (req, res) => {
    const { student_id, student_name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO students (student_id, student_name) VALUES ($1, $2) RETURNING *',
            [student_id, student_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all students
app.get('/students', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM students');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM students WHERE student_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update a student
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { student_name } = req.body;
    try {
        await pool.query('UPDATE students SET student_name = $1 WHERE student_id = $2', [student_name, id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM students WHERE student_id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Courses Endpoints

// Create a new course
app.post('/courses', async (req, res) => {
    const { course_id, course_name } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO courses (course_id, course_name) VALUES ($1, $2) RETURNING *',
            [course_id, course_name]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all courses
app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get a course by ID
app.get('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM courses WHERE course_id = $1', [id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Update a course
app.put('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name } = req.body;
    try {
        await pool.query('UPDATE courses SET course_name = $1 WHERE course_id = $2', [course_name, id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete a course
app.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM courses WHERE course_id = $1', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Student-Courses Endpoints

// Enroll a student in a course
app.post('/student_courses', async (req, res) => {
    const { student_id, course_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO student_courses (student_id, course_id) VALUES ($1, $2) RETURNING *',
            [student_id, course_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Get all enrollments
app.get('/student_courses', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT s.student_name, c.course_name
             FROM student_courses sc
             JOIN students s ON sc.student_id = s.student_id
             JOIN courses c ON sc.course_id = c.course_id`
        );
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Delete an enrollment
app.delete('/student_courses', async (req, res) => {
    const { student_id, course_id } = req.body;
    try {
        await pool.query('DELETE FROM student_courses WHERE student_id = $1 AND course_id = $2', [student_id, course_id]);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
