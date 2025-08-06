import evaluate from './evaluate.js';

const rule = {
    field: 'idade',
    operator: '>=',
    value: 18,
};

const rules = [
    { field: 'idade', operator: '>=', value: 18 },
    { field: 'score', operator: '>=', value: 70 },
];

const data = {
    idade: 2,
    score: 75,
};

console.log(evaluate(rules, data));
console.log(evaluate(rule, data));
