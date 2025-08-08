export class OperatorMap {
    constructor() {
        this.operators = {
            '==': (a, b) => a == b,
            '===': (a, b) => a === b,
            '!=': (a, b) => a != b,
            '!==': (a, b) => a !== b,
            '>': (a, b) => typeof a === 'number' && a > b,
            '<': (a, b) => typeof a === 'number' && a < b,
            '>=': (a, b) => typeof a === 'number' && a >= b,
            '<=': (a, b) => typeof a === 'number' && a <= b,
            'length==': (a, b) =>
                (typeof a === 'string' || Array.isArray(a)) && a.length == b,
            'length>': (a, b) =>
                (typeof a === 'string' || Array.isArray(a)) && a.length > b,
            'length<': (a, b) =>
                (typeof a === 'string' || Array.isArray(a)) && a.length < b,
            'length>=': (a, b) =>
                (typeof a === 'string' || Array.isArray(a)) && a.length >= b,
            'length<=': (a, b) =>
                (typeof a === 'string' || Array.isArray(a)) && a.length <= b,
            exists: (a) => a != undefined && a != null,
            notExists: (a) => a == undefined || a == null,
            in: (a, b) => a in b,
            notIn: (a, b) => !(a in b),
            includes: (a, b) => {
                if (typeof a === 'string' || Array.isArray(a))
                    return a.includes(b);

                return false;
            },
            notIncludes: (a, b) => {
                if (typeof a === 'string' || Array.isArray(a))
                    return !a.includes(b);

                return false;
            },
            isEmpty: (a) => {
                if (a == undefined || a == null) return true;
                if (typeof a === 'string' && a.trim() === '') return true;
                if (Array.isArray(a) && a.length === 0) return true;
                if (
                    typeof a === 'object' &&
                    !Array.isArray(a) &&
                    Object.keys(a).length === 0
                )
                    return true;

                return false;
            },
            isNumber: (a) => {
                if (typeof a === 'number') return true;
                return false;
            },
            startsWith: (a, b) => typeof a === 'string' && a.startsWith(b),
            endsWith: (a, b) => typeof a === 'string' && a.endsWith(b),
            matchRegex: (a, b) => {
                if (typeof a != 'string') return false;

                try {
                    const regex = b instanceof RegExp ? b : new RegExp(b);
                    return regex.test(a);
                } catch (e) {
                    return false;
                }
            },
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
