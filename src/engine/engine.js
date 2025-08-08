import evaluate from './evaluate.js';
class RulesEngine {
    constructor() {}

    validateInput(rules, data) {
        if (!rules || typeof rules !== 'object') return false;
        if (!data || typeof data !== 'object') return false;
        if (!rules.validations || typeof rules.validations !== 'object')
            return false;

        return true;
    }

    run(rules, data) {
        if (typeof rules === 'string') {
            try {
                rules = JSON.parse(rules);
            } catch {
                throw new Error('Invalid JSON string for rules');
            }
        }

        this.validateInput(rules, data);
        if (!this.validateInput(rules, data)) {
            throw new Error('Invalid rules or data object');
        }
        const validations = rules['validations'];
        for (const key in validations) {
            if (Object.prototype.hasOwnProperty.call(validations, key)) {
                return evaluate(validations[key], data);
            }
        }
    }
}

export default RulesEngine;
