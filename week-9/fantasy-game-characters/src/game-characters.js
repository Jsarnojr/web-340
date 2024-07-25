// src/game-characters.js
const { spawn } = require("child_process");
const path = require("path");

class GameCharacters {
  constructor(scriptFile) {
    this.scriptFilePath = scriptFile;
  }

  getCharacters(callback) {
    const child = spawn('node', [this.scriptFilePath]);

    let data = '';
    let error = '';

    child.stdout.on('data', (chunk) => {
      data += chunk;
    });

    child.stderr.on('data', (chunk) => {
      error += chunk;
    });

    child.on('close', (code) => {
      if (code !== 0) {
        callback(new Error(error), null);
      } else {
        callback(null, JSON.parse(data));
      }
    });
  }
}

module.exports = { GameCharacters };
