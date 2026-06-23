// Import Node's readline module so the program can accept input from the console
const readline = require("readline");

// Create an input/output interface for reading user entries
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store all valid integers entered by the user
let numbers = [];

console.log("Enter integers one at a time.");
console.log("Type q when finished.\n");

// Repeatedly ask the user for input until they type q
function getInput() {
    rl.question("Enter an integer (or q to quit): ", (input) => {

        // Stop collecting input when the user enters q
        if (input.toLowerCase() === "q") {

            // Handle the case where the user quits without entering numbers
            if (numbers.length === 0) {
                console.log("\nNo numbers entered.");
                rl.close();
                return;
            }

            // Sort numbers from smallest to largest for the median calculation
            numbers.sort((a, b) => a - b);

            const count = numbers.length;

            // Calculate the mean by adding all numbers and dividing by count
            const mean = numbers.reduce((sum, num) => sum + num, 0) / count;

            let median;

            // Calculate median differently depending on odd or even count
            if (count % 2 === 0) {
                median = (numbers[count / 2 - 1] + numbers[count / 2]) / 2;
            } else {
                median = numbers[Math.floor(count / 2)];
            }

            // Find minimum and maximum values in the array
            const min = Math.min(...numbers);
            const max = Math.max(...numbers);

            // Display final results
            console.log("\nResults");
            console.log("-------------------");
            console.log(`Count: ${count}`);
            console.log(`Mean: ${mean.toFixed(2)}`);
            console.log(`Median: ${median}`);
            console.log(`Minimum: ${min}`);
            console.log(`Maximum: ${max}`);

            rl.close();
            return;
        }

        // Convert user input into a number
        const number = Number(input);

        // Reject invalid entries such as words or decimals
        if (!Number.isInteger(number)) {
            console.log("Error: Please enter a valid integer.");
        } else {
            numbers.push(number);
        }

        // Continue asking for more input
        getInput();
    });
}

getInput();