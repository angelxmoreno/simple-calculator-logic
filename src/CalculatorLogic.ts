import {CalculatorKeys} from "./CalculatorKeys";
import isNumber from 'lodash/isNumber'

export default class CalculatorLogic {
    protected operand1: number = 0;
    protected operand2: number | null = null;
    protected operator: string | null = null;

    public keyPressed(key: CalculatorKeys): void {
        switch (true) {
            case isNumber(key):
                break;
        }
    }
}