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
    const isValid = operatorFn(value, rule.value);
    return {
        valid: isValid,
        error: isValid
            ? null
            : `Validation failed on field '${rule.field}' with operator '${rule.operator}'`,
    };
}

function evaluateSet(rules, data, logic) {
    const checkAll = logic === 'all';
    for (const rule of rules) {
        const result = evaluateSingle(rule, data);
        if (!result.valid && checkAll) return result;
        if (result.valid && !checkAll) return result;
    }

    return checkAll
        ? { valid: true, error: null }
        : { valid: false, error: 'No conditions matched in ANY' };
}
