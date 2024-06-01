/**
 * Author: Joseph Sarno
 * Date:06/01/2024
 * File Name: Weight-converter
 * Description: this will convert weight
*/

"use strict";

// TODO: Implement the weight conversion logic here
// weight-converter.js

// Conversion factor: 1 pound is approximately equal to 0.453592 kilograms
const conversionFactor = 0.453592;

// Get the command line arguments
const args = process.argv.slice(2);

// Function to print usage message to stderr
function printUsage() {
    console.error('Usage: node weight-converter.js <pounds>');
}

// Function to print error message for non-numeric input
function printError() {
    console.error('Input must be a number.');
}

// Check if there is exactly one command line argument
if (args.length !== 1) {
    printUsage();
    process.exit(1);
}

// Get the input value
const pounds = args[0];

// Validate the input
if (isNaN(pounds)) {
    printError();
    process.exit(1);
}

// Convert pounds to kilograms
const kilograms = pounds * conversionFactor;

// Print the result rounded to two decimal places
console.log(`${pounds} pounds is equal to ${kilograms.toFixed(2)} kilograms`);
