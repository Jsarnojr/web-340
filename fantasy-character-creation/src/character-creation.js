// src/character-creation.js
"use strict";

const fs = require('fs').promises;
const path = require('path');
const characterFile = path.join(__dirname, '../test/characters.json');

async function createCharacter(character) {
  try {
    let characters = [];
    try {
      const data = await fs.readFile(characterFile, 'utf8');
      characters = JSON.parse(data);
    } catch (error) {
      // File might not exist, initialize characters as an empty array
    }
    characters.push(character);
    await fs.writeFile(characterFile, JSON.stringify(characters, null, 2));
  } catch (error) {
    throw new Error("Failed to write character data");
  }
}

async function getCharacters() {
  try {
    const data = await fs.readFile(characterFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Failed to read character data");
  }
}

module.exports = { createCharacter, getCharacters };
