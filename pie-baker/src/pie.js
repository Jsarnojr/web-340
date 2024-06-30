/**
 * Author: Joseph Sarno
 * Date: 06/30/24
 * File Name: pie-baker
 * Description: pie-baker
 */
"use strict";

function bakePie(pieType, ingredients) {
  const essentialIngredients = ['flour', 'sugar', 'butter'];
  for (const essential of essentialIngredients) {
    if (!ingredients.includes(essential)) {
      console.warn(`Warning: ${essential} is missing!`);
      process.exit(1);
    }
  }
  return `Successfully baked a ${pieType} pie with ${ingredients.join(', ')}.`;
}

module.exports = { bakePie };
