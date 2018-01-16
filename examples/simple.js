const SATInstance = require('../index.js');

const sat = new SATInstance();
sat.parseClause('A B');
sat.parseClause('A ~C');
sat.parseClause('~A ~B');
sat.parseClause('B C');

let ret = sat.solutions(); // => array with the solutions
console.log(ret);
// [ '~A, B, ~C', 'A, ~B, C' ]

const partialSolution = sat.createSolution();
partialSolution.set('A', true);
ret = sat.solutions(partialSolution); // => solutions having A=true
console.log(ret);
// [ 'A, ~B, C' ]
