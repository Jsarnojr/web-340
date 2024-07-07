"use strict";

const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

let character = {};

app.post('/create-character', (req, res) => {
  const { class: characterClass, gender, funFact } = req.query;
  character = { characterClass, gender, funFact };
  res.status(201).send('Character created');
});

app.post('/confirm-character', (req, res) => {
  if (character.characterClass && character.gender && character.funFact) {
    res.status(200).send('Character creation confirmed');
  } else {
    res.status(400).send('No character to confirm');
  }
});

app.get('/view-character', (req, res) => {
  if (character.characterClass && character.gender && character.funFact) {
    res.status(200).json(character);
  } else {
    res.status(404).send('No character found');
  }
});

describe('Character Creation Routes', () => {
  it('should create a character', async () => {
    const response = await request(app)
      .post('/create-character')
      .query({ class: 'Warrior', gender: 'Male', funFact: 'Loves dragons' });
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('Character created');
  });

  it('should confirm character creation', async () => {
    await request(app)
      .post('/create-character')
      .query({ class: 'Warrior', gender: 'Male', funFact: 'Loves dragons' });
    const response = await request(app).post('/confirm-character');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Character creation confirmed');
  });

  it('should view the character', async () => {
    await request(app)
      .post('/create-character')
      .query({ class: 'Warrior', gender: 'Male', funFact: 'Loves dragons' });
    const response = await request(app).get('/view-character');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      characterClass: 'Warrior',
      gender: 'Male',
      funFact: 'Loves dragons'
    });
  });

  it('should return 404 for viewing character if none exists', async () => {
    const response = await request(app).get('/view-character');
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('No character found');
  });

  it('should return 400 for confirming character if none exists', async () => {
    const response = await request(app).post('/confirm-character');
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('No character to confirm');
  });
});
