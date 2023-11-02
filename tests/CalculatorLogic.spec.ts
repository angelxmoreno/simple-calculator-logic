import CalculatorLogic from '../src/CalculatorLogic';
import { assert } from 'chai';
import { CalculatorKeys } from '../src/CalculatorKeys';

describe('CalculatorLogic', () => {
    it('can be instantiated', () => {
        const obj = new CalculatorLogic();
        assert.instanceOf(obj, CalculatorLogic);
    });

    it('takes in a key press', () => {
        assert.doesNotThrow(() => {
            const obj = new CalculatorLogic();
            obj.keyPressed(CalculatorKeys.NUM_1);
        });
    });
});
