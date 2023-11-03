import { CalculatorButtons } from './CalculatorButtons';

export default class CalculatorLogic {
    private currentOperand: string = '';
    private currentOperator: string | null = null;
    private currentResult: number | null = null;

    pressKey(key: CalculatorButtons): CalculatorLogic {
        if (key === CalculatorButtons.Decimal) {
            if (!this.currentOperand.includes('.')) {
                this.currentOperand += key.toString();
            }
        } else if (typeof key === 'number') {
            this.currentOperand = Number(this.currentOperand + key.toString()).toString();
        } else if (this.isValidOperator(key)) {
            this.handleOperator(key);
        } else if (key === CalculatorButtons.Equals) {
            this.calculateResult();
        } else if (key === CalculatorButtons.Negate) {
            this.toggleSign();
        } else if (key === CalculatorButtons.Clear) {
            this.clearInput();
        }

        return this;
    }

    private toggleSign() {
        if (this.currentOperand !== '') {
            const numericValue = parseFloat(this.currentOperand);
            this.currentOperand = (-numericValue).toString();
        } else if (this.currentResult !== null) {
            this.currentResult = -this.currentResult;
        }
    }

    private isValidOperator(key: CalculatorButtons): boolean {
        return (
            key === CalculatorButtons.Plus ||
            key === CalculatorButtons.Minus ||
            key === CalculatorButtons.Multiply ||
            key === CalculatorButtons.Divide ||
            key === CalculatorButtons.SquareRoot ||
            key === CalculatorButtons.Percentage
        );
    }

    private handleOperator(key: CalculatorButtons) {
        if (key === CalculatorButtons.SquareRoot) {
            this.calculateSquareRoot();
        } else if (key === CalculatorButtons.Percentage) {
            this.calculatePercentage();
        } else {
            this.currentOperator = key.toString();
            this.calculateResult();
        }
    }

    private calculateResult() {
        if (this.currentOperand && this.currentOperator) {
            try {
                const operand = parseFloat(this.currentOperand);
                if (this.currentResult === null) {
                    this.currentResult = operand;
                } else {
                    switch (this.currentOperator) {
                        case CalculatorButtons.Plus.toString():
                            this.currentResult += operand;
                            break;
                        case CalculatorButtons.Minus.toString():
                            this.currentResult -= operand;
                            break;
                        case CalculatorButtons.Multiply.toString():
                            this.currentResult *= operand;
                            break;
                        case CalculatorButtons.Divide.toString():
                            if (operand !== 0) {
                                this.currentResult /= operand;
                            } else {
                                throw new Error('Division by zero is not allowed.');
                            }
                            break;
                    }
                }
            } catch (error) {
                this.currentResult = null;
            }
            this.currentOperand = '';
        }
    }

    private calculateSquareRoot() {
        try {
            const operand = parseFloat(this.currentOperand);
            if (operand >= 0) {
                this.currentResult = Math.sqrt(operand);
                this.currentOperand = this.currentResult.toString();
            } else {
                throw new Error('Square root of a negative number is not allowed.');
            }
        } catch (error) {
            this.currentResult = null;
            this.currentOperand = 'Error';
        }
    }

    private calculatePercentage() {
        try {
            const operand = parseFloat(this.currentOperand);
            this.currentResult = operand / 100;
            this.currentOperand = this.currentResult.toString();
        } catch (error) {
            this.currentResult = null;
            this.currentOperand = 'Error';
        }
    }

    getResult(): number | null {
        return this.currentResult;
    }

    getDisplay(): string {
        if (this.currentResult !== null) {
            return this.currentResult.toString();
        } else {
            return this.currentOperand || '0';
        }
    }

    private clearInput() {
        this.currentOperand = '0';
        this.currentOperator = null;
        this.currentResult = null;
    }
}
