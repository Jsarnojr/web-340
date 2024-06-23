/**
 * Author: Joseph Sarno
 * Date: 06/23/24
 * File Name: taco-stand
 * Description: taco stand CLI program
 */
"use strict";

const readline = require("readline");
const TacoStandEmitter = require("./TacoStandEmitter");

const tacoStand = new TacoStandEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

tacoStand.on('serve', (customer) => {
  console.log(`Taco Stand serves: ${customer}`);
});

tacoStand.on('prepare', (taco) => {
  console.log(`Taco Stand prepares: ${taco} taco`);
});

tacoStand.on('rush', (rush) => {
  console.log(`Taco Stand handles rush: ${rush}`);
});

rl.on("line", (input) => {
  const [command, ...args] = input.split(" ");

  switch (command) {
    case 'serve':
      tacoStand.serveCustomer(args.join(' '));
      break;
    case 'prepare':
      tacoStand.prepareTaco(args.join(' '));
      break;
    case 'rush':
      tacoStand.handleRush(args.join(' '));
      break;
    default:
      console.error(`Unknown command: ${command}`);
  }
});

console.log(`Enter a command: "serve", "prepare", or "rush", followed by a space and the argument.`);
