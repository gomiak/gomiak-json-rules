export class OperatorMap {
    constructor() {
        this.operators = {
            '==': (a, b) => a == b,
            '>=': (a, b) => a >= b,
            isEmail: (a) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a),
        };
    }

    get(name) {
        const op = this.operators[name];
        if (!op) throw new Error(`Unknown operator: ${name}`);
        return op;
    }

    has(name) {
        return !!this.operators[name];
    }

    list() {
        return Object.keys(this.operators);
    }
}
