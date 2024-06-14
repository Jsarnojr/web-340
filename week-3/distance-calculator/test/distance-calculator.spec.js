const assert = require('assert');
const calculateDistance = require('../src/distance-calculator');

// Test 1: Calculate distance between Earth and Mars
function testEarthToMars() {
  try {
    const expectedDistance = Math.abs(1.00 - 1.52); // Earth to Mars distance in AU
    const calculatedDistance = calculateDistance('Earth', 'Mars');
    assert.strictEqual(calculatedDistance, expectedDistance);
    console.log('Test passed: Distance between Earth and Mars calculated correctly.');
    return true;
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    return false;
  }
}

// Test 2: Calculate distance between Mercury and Neptune
function testMercuryToNeptune() {
  try {
    const expectedDistance = Math.abs(0.39 - 30.05); // Mercury to Neptune distance in AU
    const calculatedDistance = calculateDistance('Mercury', 'Neptune');
    assert.strictEqual(calculatedDistance, expectedDistance);
    console.log('Test passed: Distance between Mercury and Neptune calculated correctly.');
    return true;
  } catch (error) {
    console.error(`Test failed: ${error.message}`);
    return false;
  }
}

// Test 3: Calculate distance between non-existent planets
function testInvalidPlanets() {
  try {
    calculateDistance('Pluto', 'Vulcan');
    console.error('Test failed: Expected error for invalid planets.');
    return false;
  } catch (error) {
    console.log(`Test passed: Error correctly thrown for invalid planets: ${error.message}`);
    return true;
  }
}

// Run the tests
function runTests() {
  const tests = [
    testEarthToMars,
    testMercuryToNeptune,
    testInvalidPlanets
  ];

  tests.forEach(testFunction => {
    console.log(`Running test: ${testFunction.name}`);
    testFunction();
  });
}

// Call the runTests function to execute all tests
runTests();
