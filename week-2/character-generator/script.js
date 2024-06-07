/*
  Pragmatic JavaScript
  Chapter 1
  Programming Assignment

  Author: Joseph Sarno
  Date: 06/07/2024
  Filename: Character-generator
*/

"use strict";

function createCharacter(name, gender, characterClass) {
  return {
    getName: () => name,
    getGender: () => gender,
    getClass: () => characterClass
  };
}

document.getElementById("generateHero").addEventListener("click", function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("heroName").value;
  const gender = document.getElementById("heroGender").value;
  const characterClass = document.getElementById("heroClass").value;

  // Create character
  const character = createCharacter(name, gender, characterClass);

  // Display character information
  const characterOutput = document.getElementById("characterOutput");
  characterOutput.innerHTML = `
    <p><strong>Name:</strong> ${character.getName()}</p>
    <p><strong>Gender:</strong> ${character.getGender()}</p>
    <p><strong>Class:</strong> ${character.getClass()}</p>
  `;
});
