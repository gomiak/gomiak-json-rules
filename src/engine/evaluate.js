import { OperatorMap } from '../utils/OperatorMap.js';

const operatorMap = new OperatorMap();
export default function evaluate(input, data) {
    if (input.all || input.any) {
        const logic = input.all ? 'all' : 'any';
        let conditions = input[logic];

        if (Array.isArray(conditions) && conditions.length > 0) {
            return evaluateSet(conditions, data, logic);
        } else if (typeof conditions === 'object' && conditions !== null) {
            return evaluateSingle(conditions, data);
        }
    }
    return false;
}

function evaluateSingle(rule, data) {
    const value = data[rule.field];
    const operatorFn = operatorMap.get(rule.operator);
    return operatorFn(value, rule.value);
}

function evaluateSet(rules, data, logic) {
    const check = logic === 'all' ? 'every' : 'some';
    return rules[check]((rule) => {
        const value = data[rule.field];
        const operatorFn = operatorMap.get(rule.operator);
        return operatorFn(value, rule.value);
    });
}
