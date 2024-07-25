// test/game-characters.spec.js
const { GameCharacters } = require('../src/game-characters');
const path = require('path');

describe("GameCharacters", () => {
  let gameCharacters;

  beforeEach(() => {
    gameCharacters = new GameCharacters(path.join(__dirname, '../src/game-characters-data.js'));
  });

  test("should return game characters data", (done) => {
    gameCharacters.getCharacters((error, data) => {
      expect(error).toBeNull();
      expect(data).toEqual([
        { class: "Warrior", gender: "Male", funFact: "Loves fishing." },
        { class: "Mage", gender: "Female", funFact: "Has a pet owl." },
        { class: "Rogue", gender: "Other", funFact: "Enjoys skydiving." }
      ]);
      done();
    });
  });

  test("should handle an error when the game characters data script is not found", (done) => {
    const invalidGameCharacters = new GameCharacters(path.join(__dirname, '../src/nonexistent-script.js'));
    invalidGameCharacters.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      done();
    });
  });

  test("should handle an error when the game characters data script fails", (done) => {
    const failingGameCharacters = new GameCharacters(path.join(__dirname, '../src/failing-script.js'));
    failingGameCharacters.getCharacters((error, data) => {
      expect(error).not.toBeNull();
      expect(data).toBeNull();
      done();
    });
  });
});
