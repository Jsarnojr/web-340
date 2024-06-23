/**
 * Author: Joseph Sarno
 * Date: 06/23/24
 * File Name: taco-stand-spec.js
 * Description: Unit tests for TacoStandEmitter
 */
"use strict";

const assert = require('assert');
const TacoStandEmitter = require('./TacoStandEmitter');

function testServeCustomer() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on('serve', (customer) => {
      assert.strictEqual(customer, 'John');
      console.log("Passed testServeCustomer");
    });
    tacoStand.serveCustomer('John');
    return true;
  } catch (err) {
    console.error(`Failed testServeCustomer: ${err}`);
    return false;
  }
}

function testPrepareTaco() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on('prepare', (taco) => {
      assert.strictEqual(taco, 'beef');
      console.log("Passed testPrepareTaco");
    });
    tacoStand.prepareTaco('beef');
    return true;
  } catch (err) {
    console.error(`Failed testPrepareTaco: ${err}`);
    return false;
  }
}

function testHandleRush() {
  try {
    const tacoStand = new TacoStandEmitter();
    tacoStand.on('rush', (rush) => {
      assert.strictEqual(rush, 'lunch');
      console.log("Passed testHandleRush");
    });
    tacoStand.handleRush('lunch');
    return true;
  } catch (err) {
    console.error(`Failed testHandleRush: ${err}`);
    return false;
  }
}

testServeCustomer();
testPrepareTaco();
testHandleRush();
