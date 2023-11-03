# Simple Calculator Logic

A simple calculator logic package that provides an enum `CalculatorButtons` and a class `CalculatorLogic` for basic calculator functionality.

## Installation

You can install this package using npm or yarn:

```bash
npm install simple-calculator-logic
```
or
```bash
yarn add simple-calculator-logic
```

## Usage
### Importing
You can import the `CalculatorButtons` enum and the `CalculatorLogic` class as follows:

```javascript
import { CalculatorButtons, CalculatorLogic } from 'simple-calculator-logic';
```

### CalculatorLogic
CalculatorLogic is a class that represents a basic calculator with the following features:

- Arithmetic operations (addition, subtraction, multiplication, division)
- Square root calculation
- Percentage calculation
- Negation of numbers
- Clearing the calculator state

Example usage:

```javascript
const calculator = new CalculatorLogic();
calculator
    .pressKey(CalculatorButtons.Five)
    .pressKey(CalculatorButtons.Plus)
    .pressKey(CalculatorButtons.Three)
    .pressKey(CalculatorButtons.Equals);

console.log(calculator.getDisplay()); // Output: "8"
```

### CalculatorButtons
`CalculatorButtons` is an enum that provides a set of calculator button values for use with CalculatorLogic. The available button values include:

- Plus
- Minus
- Multiply
- Divide
- SquareRoot
- Percentage
- Negate
- Equals
- Clear
- Decimal
- Numeric values (e.g., One, Two, ..., Nine, Zero)

## Testing

To run tests for the `simple-calculator-logic` package, you will need to have Node.js and npm or yarn installed on your system.

1. First, ensure that you have installed the necessary development dependencies by running the following command in the package directory:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```
2. Once the development dependencies are installed, you can run the tests using the following command:
    ```bash
   npm test
    ```
    or
    ```bash
    yarn test 
    ```
3. The test suite will run, and you will see the test results in your console.

## License
This package is open-source and available under the MIT License.
