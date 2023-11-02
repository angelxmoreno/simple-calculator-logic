import CalculatorLogic from "../src/CalculatorLogic";
import {assert} from "chai";

describe('CalculatorLogic', () => {
    it('can be instantiated', () => {
        const obj = new CalculatorLogic()
        assert.instanceOf(obj, CalculatorLogic)
    })
})