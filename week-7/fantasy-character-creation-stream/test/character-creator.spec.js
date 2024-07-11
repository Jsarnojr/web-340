const CharacterCreator = require('../src/character-creator');

describe('CharacterCreator', () => {
  let characterCreator;

  beforeEach(() => {
    characterCreator = new CharacterCreator();
  });

  test("should process data correctly when written to", (done) => {
    const testData = {
      class: 'Warrior',
      gender: 'Male',
      funFact: 'Loves to climb mountains'
    };

    const expectedDescription = `Character Class: ${testData.class}\nGender: ${testData.gender}\nFun Fact: ${testData.funFact}\n`;

    characterCreator.on('data', (data) => {
      expect(data.toString()).toBe(expectedDescription);
      done();
    });

    characterCreator.write(JSON.stringify(testData));
    characterCreator.end();
  });

  test("should emit 'error' when invalid data is written", (done) => {
    characterCreator.on('error', (err) => {
      expect(err.message).toBe('Invalid character data');
      done();
    });

    characterCreator.write('');
    characterCreator.end();
  });

  test("should transform data correctly when written to", (done) => {
    const testData = {
      class: 'Mage',
      gender: 'Female',
      funFact: 'Expert in fire magic'
    };

    const transformedData = {
      class: 'Mage',
      gender: 'Female',
      funFact: 'Expert in fire magic (Level 10)'
    };

    const expectedDescription = `Character Class: ${transformedData.class}\nGender: ${transformedData.gender}\nFun Fact: ${transformedData.funFact}\n`;

    characterCreator.on('data', (data) => {
      expect(data.toString()).toBe(expectedDescription);
      done();
    });

    characterCreator.write(JSON.stringify(testData));
    characterCreator.end();
  });
});
