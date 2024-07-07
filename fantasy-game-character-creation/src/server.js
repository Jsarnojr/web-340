"use strict";

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let character = {};

// Route to create a character
app.post('/create-character', (req, res) => {
  const { class: characterClass, gender, funFact } = req.query;
  character = { characterClass, gender, funFact };
  res.status(201).send('Character created');
});

// Route to confirm character creation
app.post('/confirm-character', (req, res) => {
  if (character.characterClass && character.gender && character.funFact) {
    res.status(200).send('Character creation confirmed');
  } else {
    res.status(400).send('No character to confirm');
  }
});

// Route to view the character
app.get('/view-character', (req, res) => {
  if (character.characterClass && character.gender && character.funFact) {
    res.status(200).json(character);
  } else {
    res.status(404).send('No character found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
