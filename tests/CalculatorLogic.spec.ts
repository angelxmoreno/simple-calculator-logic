import { expect } from 'chai';
import { CalculatorButtons, CalculatorLogic } from '../src';

describe('CalculatorLogic', function () {
    let calculator: CalculatorLogic;

    beforeEach(function () {
        calculator = new CalculatorLogic();
    });

    it('should add two numbers correctly', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Equals);
        expect(calculator.getResult()).to.equal(8);
    });

    it('should multiply two numbers correctly', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Multiply)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Equals);
        expect(calculator.getResult()).to.equal(15);
    });

    it('should divide two numbers correctly', function () {
        calculator
            .pressKey(CalculatorButtons.Six)
            .pressKey(CalculatorButtons.Divide)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Equals);
        expect(calculator.getResult()).to.equal(2);
    });

    it('should handle decimal numbers', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.One)
            .pressKey(CalculatorButtons.Equals);
        expect(calculator.getResult()).to.equal(8.3);
    });

    it('should calculate square root correctly', function () {
        calculator.pressKey(CalculatorButtons.Four).pressKey(CalculatorButtons.SquareRoot);
        expect(calculator.getResult()).to.equal(2);
    });

    it('should calculate percentage correctly', function () {
        calculator.pressKey(CalculatorButtons.Seven).pressKey(CalculatorButtons.Percentage);
        expect(calculator.getResult()).to.equal(0.07);
    });

    it('should handle division by zero', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Divide)
            .pressKey(CalculatorButtons.Zero)
            .pressKey(CalculatorButtons.Equals);
        expect(calculator.getResult()).to.be.null;
    });

    it('should handle square root of a negative number', function () {
        calculator
            .pressKey(CalculatorButtons.Four)
            .pressKey(CalculatorButtons.Negate)
            .pressKey(CalculatorButtons.SquareRoot);
        expect(calculator.getDisplay()).to.equal('Error');
    });

    it('should negate a positive number', function () {
        calculator.pressKey(CalculatorButtons.Five).pressKey(CalculatorButtons.Negate);
        expect(calculator.getDisplay()).to.equal('-5');
    });

    it('should correctly add multiple numbers', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Equals);

        expect(calculator.getDisplay()).to.equal('8');
    });

    it('should negate a negative number', function () {
        calculator.pressKey(CalculatorButtons.Five).pressKey(CalculatorButtons.Negate);
        expect(calculator.getDisplay()).to.equal('-5');
    });

    it('should clear the calculator and reset the display to "0"', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Clear);
        expect(calculator.getDisplay()).to.equal('0');
    });

    it('should clear the calculator after a calculation and reset the display to "0"', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Equals)
            .pressKey(CalculatorButtons.Clear);
        expect(calculator.getDisplay()).to.equal('0');
    });

    it('should clear the calculator after negating a number and reset the display to "0"', function () {
        calculator
            .pressKey(CalculatorButtons.Minus)
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Negate)
            .pressKey(CalculatorButtons.Clear);
        expect(calculator.getDisplay()).to.equal('0');
    });

    it('should prevent multiple decimal points', function () {
        calculator
            .pressKey(CalculatorButtons.One)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.Four);
        expect(calculator.getDisplay()).to.equal('12.34');
    });

    it('should properly display numbers without leading zeros', function () {
        calculator.pressKey(CalculatorButtons.Clear).pressKey(CalculatorButtons.Two);

        expect(calculator.getDisplay()).to.equal('2');
    });

    it('should display the second operand when the first operand exists', function () {
        calculator
            .pressKey(CalculatorButtons.Clear)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three);

        expect(calculator.getDisplay()).to.equal('3');
    });

    it('should retain current result when entering an operator', function () {
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Three)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Multiply)
            .pressKey(CalculatorButtons.Four)
            .pressKey(CalculatorButtons.Equals);

        expect(calculator.getResult()).to.equal(40);

        // After the calculation, entering new digits should start a new number
        calculator
            .pressKey(CalculatorButtons.Five)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Equals);

        expect(calculator.getResult()).to.equal(7);
    });

    it('should not lose precision', function () {
        calculator
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.One)
            .pressKey(CalculatorButtons.Plus)
            .pressKey(CalculatorButtons.Decimal)
            .pressKey(CalculatorButtons.Two)
            .pressKey(CalculatorButtons.Equals);

        expect(calculator.getDisplay()).to.equal('0.3');
    });
});
