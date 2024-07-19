// test/character-creation.spec.js
"use strict";

const path = require('path');
const characterFile = path.join(__dirname, 'characters.json');

describe("Character Creation Module", () => {
  let createCharacter;
  let getCharacters;
  let fs;

  beforeEach(() => {
    jest.resetModules();
    fs = require('fs').promises;

    // Mocking fs.promises.writeFile and fs.promises.readFile
    jest.mock('fs', () => ({
      promises: {
        writeFile: jest.fn(),
        readFile: jest.fn()
      }
    }));

    ({ createCharacter, getCharacters } = require('../src/character-creation'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should write character data to a file", async () => {
    const character = { class: "Mage", gender: "Female", funFact: "Loves magic" };
    await createCharacter(character);
    expect(fs.writeFile).toHaveBeenCalledWith(characterFile, JSON.stringify([character], null, 2));
  });

  it("should read character data from a file", async () => {
    const characters = [{ class: "Warrior", gender: "Male", funFact: "Strong and brave" }];
    fs.readFile.mockResolvedValue(JSON.stringify(characters));
    const result = await getCharacters();
    expect(result).toEqual(characters);
  });

  it("should handle errors when reading from the file", async () => {
    fs.readFile.mockRejectedValue(new Error("File not found"));
    await expect(getCharacters()).rejects.toThrow("Failed to read character data");
  });
});
