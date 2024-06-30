/**
 * Author: Joseph Sarno
 * Date: 06/30/24
 * File Name: pie-baker
 * Description: pie-baker
 */

"use strict";

const { bakePie } = require("../src/pie");
const assert = require("assert");

describe("bakePie", function() {
  it("should successfully bake a pie with all essential ingredients", function() {
    const pieType = "apple";
    const ingredients = ["flour", "sugar", "butter", "apples"];
    const result = bakePie(pieType, ingredients);
    const expectedMessage = "Successfully baked a apple pie with flour, sugar, butter, apples.";
    assert.strictEqual(result, expectedMessage);
  });

  it("should log a warning and exit if flour is missing", function() {
    const pieType = "apple";
    const ingredients = ["sugar", "butter", "apples"];

    const originalExit = process.exit;
    process.exit = (code) => {
      throw new Error(`process.exit: ${code}`);
    };

    try {
      bakePie(pieType, ingredients);
    } catch (e) {
      assert.strictEqual(e.message, "process.exit: 1");
    } finally {
      process.exit = originalExit;
    }
  });

  it("should log a warning and exit if sugar is missing", function() {
    const pieType = "apple";
    const ingredients = ["flour", "butter", "apples"];

    const originalExit = process.exit;
    process.exit = (code) => {
      throw new Error(`process.exit: ${code}`);
    };

    try {
      bakePie(pieType, ingredients);
    } catch (e) {
      assert.strictEqual(e.message, "process.exit: 1");
    } finally {
      process.exit = originalExit;
    }
  });
});
