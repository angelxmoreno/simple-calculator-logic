import { CalculatorButtons } from './CalculatorButtons'; // Replace with your import path

export class CalculatorLogic {
    private display: string = '0';
    private firstOperand: number | null = null;
    private operator: string | null = null;
    private isNewNumber = true;
    private hasOperator = false;

    pressKey(button: CalculatorButtons): CalculatorLogic {
        if (this.display === 'Error' && button !== CalculatorButtons.Clear) {
            return this;
        }

        if (this.isNewNumber) {
            this.display = '0';
            this.isNewNumber = false;
        }

        switch (button) {
            case CalculatorButtons.Zero:
            case CalculatorButtons.One:
            case CalculatorButtons.Two:
            case CalculatorButtons.Three:
            case CalculatorButtons.Four:
            case CalculatorButtons.Five:
            case CalculatorButtons.Six:
            case CalculatorButtons.Seven:
            case CalculatorButtons.Eight:
            case CalculatorButtons.Nine:
                this.handleNumber(button);
                break;
            case CalculatorButtons.Plus:
            case CalculatorButtons.Minus:
            case CalculatorButtons.Multiply:
            case CalculatorButtons.Divide:
                if (this.firstOperand !== null && this.operator) {
                    this.calculate();
                }
                this.handleOperator(button);
                break;
            case CalculatorButtons.Equals:
                if (this.firstOperand !== null && this.operator) {
                    this.calculate();
                    this.isNewNumber = true;
                    this.hasOperator = false;
                }
                break;
            case CalculatorButtons.Clear:
                this.clear();
                break;
            case CalculatorButtons.SquareRoot:
                this.calculateSquareRoot();
                break;
            case CalculatorButtons.Percentage:
                this.calculatePercentage();
                break;
            case CalculatorButtons.Decimal:
                this.handleDecimal();
                break;
            case CalculatorButtons.Negate:
                this.handleNegate();
                break;
        }

        return this;
    }

    getResult(): number | null {
        return this.display === 'Error' ? null : parseFloat(this.display);
    }

    getDisplay(): string {
        return this.display;
    }

    private handleNumber(button: CalculatorButtons) {
        if (this.display === '0' || this.isNewNumber) {
            this.display = button.toString();
            this.isNewNumber = false;
            this.hasOperator = false;
        } else {
            this.display += button;
        }
    }

    private handleOperator(operator: string) {
        if (!this.hasOperator) {
            this.firstOperand = parseFloat(this.display);
            this.operator = operator;
            this.isNewNumber = true;
            this.hasOperator = true;
        }
    }

    private calculate() {
        if (this.firstOperand !== null && this.operator) {
            const secondOperand = parseFloat(this.display);
            switch (this.operator) {
                case CalculatorButtons.Plus:
                    this.display = (this.firstOperand + secondOperand).toString();
                    break;
                case CalculatorButtons.Minus:
                    this.display = (this.firstOperand - secondOperand).toString();
                    break;
                case CalculatorButtons.Multiply:
                    this.display = (this.firstOperand * secondOperand).toString();
                    break;
                case CalculatorButtons.Divide:
                    if (secondOperand === 0) {
                        this.display = 'Error';
                    } else {
                        this.display = (this.firstOperand / secondOperand).toString();
                    }
                    break;
            }
            this.firstOperand = null;
            this.operator = null;
        }
    }

    private clear() {
        this.display = '0';
        this.firstOperand = null;
        this.operator = null;
        this.isNewNumber = true;
        this.hasOperator = false;
    }

    private calculateSquareRoot() {
        const value = parseFloat(this.display);
        if (value < 0) {
            this.display = 'Error';
        } else {
            this.display = Math.sqrt(value).toString();
        }
    }

    private calculatePercentage() {
        const value = parseFloat(this.display);
        this.display = (value / 100).toString();
    }

    private handleDecimal() {
        if (!this.display.includes('.')) {
            this.display += '.';
        }
    }

    private handleNegate() {
        if (this.display !== '0' && this.display !== 'Error') {
            if (this.display.charAt(0) === '-') {
                this.display = this.display.slice(1);
            } else {
                this.display = '-' + this.display;
            }
        }
    }
}
