const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let numbers = [];

// Prompts the user for integers until q or Q is entered.
function askForNumber() {
    rl.question("Enter an integer, or q to quit: ", function(input) {
        if (input.toLowerCase() === "q") {
            showResults();
            rl.close();
            return;
        }

        const number = Number(input);

        if (!Number.isInteger(number)) {
            console.log("Error: Please enter an integer or q.");
        } else {
            numbers.push(number);
        }

        askForNumber();
    });
}

// Checks whether any two entered numbers multiply to equal a third number.
function findCondition(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            for (let k = 0; k < numbers.length; k++) {
                if (k !== i && k !== j && numbers[i] * numbers[j] === numbers[k]) {
                    return `${numbers[i]} x ${numbers[j]} = ${numbers[k]}`;
                }
            }
        }
    }

    return null;
}

// Displays the entered numbers and the final condition result.
function showResults() {
    console.log("\nIntegers entered:");

    if (numbers.length === 0) {
        console.log("None");
    } else {
        console.log(numbers.join(", "));
    }

    const result = findCondition(numbers);

    if (result) {
        console.log(`Condition is met: ${result}`);
    } else {
        console.log("Condition was not met");
    }
}

askForNumber();