"use strict";

function calculateDistance(planet1, planet2) {
  const distances = {
    "Mercury": 0.39,
    "Venus": 0.72,
    "Earth": 1.00,
    "Mars": 1.52,
    "Jupiter": 5.20,
    "Saturn": 9.58,
    "Uranus": 19.22,
    "Neptune": 30.05
  };

  if (!(planet1 in distances) || !(planet2 in distances)) {
    throw new Error("Invalid planet name(s).");
  }

  return Math.abs(distances[planet1] - distances[planet2]);
}

module.exports = calculateDistance;
