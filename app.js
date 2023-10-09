const express = require('express');
const knex = require('knex');
const app = express();



const db = knex(require('./knexfile')['development']);

app.use(express.static('public'));

// Create (POST) route
app.post('/api/users', async (req, res) => {
  try {
    const newUser = await db('users').insert(req.body).returning('*');
    res.status(201).json(newUser[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user.', details: error.message });
  }  
});

// Read (GET) route
app.get('/api/users', async (req, res) => {
  try {
    const users = await db('users').select('*');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users.' });
  }
});

// Update (PUT or PATCH) route
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await db('users')
      .where({ id })
      .update(req.body)
      .returning('*');
    res.json(updatedUser[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// Delete (DELETE) route
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCount = await db('users').where({ id }).delete();
    if (deletedCount === 0) {
      res.status(404).json({ error: 'User not found.' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

// Define other routes as needed for your application

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
