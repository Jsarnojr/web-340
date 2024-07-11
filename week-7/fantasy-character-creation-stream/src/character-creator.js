const { Duplex } = require('stream');

class CharacterCreator extends Duplex {
  constructor(options) {
    super(options);
    this.characterData = {
      class: '',
      gender: '',
      funFact: ''
    };
  }

  _write(chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString());
    this.characterData.class = data.class || '';
    this.characterData.gender = data.gender || '';
    this.characterData.funFact = data.funFact || '';
    callback();
  }

  _read(size) {
    const formattedDescription = `Character Class: ${this.characterData.class}\nGender: ${this.characterData.gender}\nFun Fact: ${this.characterData.funFact}\n`;
    this.push(formattedDescription);
    this.push(null);
  }
}

module.exports = CharacterCreator;
