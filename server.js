const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// For my notes this serves as in-memory storage (data disappears when server restarts)
let quotes = [
  { id: 1, text: "The only way to do great work is to love what you do", author: "Steve Jobs" },
  { id: 2, text: "Innovation distinguishes between a leader and a follower", author: "Steve Jobs" }
];

let nextId = 3;

// Getting all quotes
app.get('/quotes', (req, res) => {
  res.json(quotes);
});

// Adding a new quote
app.post('/quotes', (req, res) => {
  const { text, author } = req.body;
  
  if (!text || !author) {
    return res.status(400).json({ error: 'Text and author are required' });
  }
  
  const newQuote = { id: nextId++, text, author };
  quotes.push(newQuote);
  res.status(201).json(newQuote);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
