import { OperatorMap } from '../utils/OperatorMap.js';

const operatorMap = new OperatorMap();

export default function evaluate(input, data) {
    if (Array.isArray(input)) {
        return evaluateSet(input, data);
    } else {
        return evaluateSingle(input, data);
    }
}

function evaluateSingle(rule, data) {
    const value = data[rule.field];
    const operatorFn = operatorMap.get(rule.operator);
    return operatorFn(value, rule.value);
}

function evaluateSet(rules, data) {
    return rules.every((rule) => {
        const value = data[rule.field];
        const operatorFn = operatorMap.get(rule.operator);
        return operatorFn(value, rule.value);
    });
}
