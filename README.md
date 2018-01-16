# sat-solver-js
Simple SAT solver for javascript

## Usage

```js
const SATInstance = require('sat-solver-js');

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
```

The method `solutions` has two optional parameters:

* `partialSolution (default null)`: a partial assignment of the variables to which the solutions have to comply.
* `verboseLevel (default 0)`: 
  - 0: prints nothing
  - 1: prints the number of solutions or satisfying assigments
  - 2: prints every solution found
  - 3: prints details of the process

To run the examples: `node examples/{filename}`.

## Acknowledgements

* Implementation based on [sahands/simple-sat](https://github.com/sahands/simple-sat).
* Used `deque` implementation from [montagejs/collections](https://github.com/montagejs/collections).
