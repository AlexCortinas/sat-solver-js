const Deque = require('collections/deque');
const Assignment = require('./assignment');

class SATInstance {
  constructor() {
    this.variables = [];
    this.variableTable = {};
    this.clauses = [];
  }

  parseClause(clause) {
    const convertedClause = [];
    let negated, encodedLiteral;

    clause.split(' ').forEach(variable => {
      negated = variable[0] == '~';
      variable = variable.substr(negated);
      encodedLiteral = this.addVariable(variable) << 1 | negated;
      convertedClause.push(encodedLiteral);
    });
    this.clauses.push(convertedClause);
  }

  addVariable(v) {
    if (this.getVariable(v) == null) {
      this.variableTable[v] = this.variables.length;
      this.variables.push(v);
    }
    return this.getVariable(v);
  }

  getVariable(v) {
    return this.variableTable[v];
  }

  clauseToString(clause) {
    return clause.map(l => this.literalToString(l)).join(' ');
  }

  literalToString(literal) {
    return (literal & 1 ? '~' : '') + this.variables[literal >> 1];
  }

  assignmentToString(assignment) {
    const literals = [];
    let i, a, v;
    for (i = 0; i < assignment.length; i++) {
      a = assignment[i];
      v = this.variables[i];
      if (a == 0) {
        literals.push('~' + v);
      } else if (a == 1) {
        literals.push(v);
      }
    }
    return literals.join(', ');
  }

  createSolution() {
    return new Assignment(this.variableTable);
  }

  setupWatchlist() {
    const watchlist = [...Array(this.variables.length * 2)].map(() => new Deque());
    this.clauses.forEach(clause => watchlist[clause[0]].push(clause));
    return watchlist;
  }

  dumpWatchlist(watchlist) {
    console.log('Current watchlist:');
    watchlist.forEach((w, l) => {
      const literalString = this.literalToString(l);
      const clausesString = w.map(c => this.clauseToString(c)).join(', ');
      console.log(`${literalString}: ${clausesString}`);
    });
  }

  updateWatchlist(watchlist, falseLiteral, assignment, verbose) {
    let foundAlternative, clause, v, a;

    while (watchlist[falseLiteral].length > 0) {
      clause = watchlist[falseLiteral].peek();
      foundAlternative = false;

      for (let alternative of clause) {
        v = alternative >> 1;
        a = alternative & 1;
        if (assignment[v] == null || assignment[v] == a ^ 1) {
          foundAlternative = true;
          watchlist[falseLiteral].shift();
          watchlist[alternative].push(clause);
          break;
        }
      }

      if (!foundAlternative) {
        if (verbose && verbose > 2) {
          this.dumpWatchlist(watchlist);
          console.log(`Current assignment: ${this.assignmentToString(assignment)}`);
          console.log(`Clause ${this.clauseToString(clause)} contradicted.`);
        }
        return false;
      }

    }
    return true;
  }

  * _solve(watchlist, assignment, selection, d, verbose) {

    if (d == this.variables.length) {
      yield assignment;
      return;
    }

    const toCheck = [];
    if (!selection || selection[d] == null) {
      toCheck.push(0);
      toCheck.push(1);
    } else {
      toCheck.push(selection[d]);
    }

    for (let a of toCheck) {
      assignment[d] = a;
      if (this.updateWatchlist(watchlist, (d << 1) | a, assignment, verbose)) {
        for (let b of this._solve(watchlist, assignment, selection, d + 1, verbose)) {
          yield b;
        }
      }
    }

    assignment[d] = null;
  }

  solutions(partialAssignment, verbose) {
    let a, watchlist, assignment, assignments, count, ret;

    if (partialAssignment && partialAssignment.array) {
      partialAssignment = partialAssignment.array;
    }

    watchlist = this.setupWatchlist();
    assignment = [...Array(this.variables.length)];
    assignments = this._solve(watchlist, assignment, partialAssignment, 0, verbose);
    count = 0;
    a = assignments.next();
    ret = [];

    while (a.value) {
      if (verbose && verbose > 1) {
        console.log(`Found satisfying assignment ${count}:`);
        console.log(this.assignmentToString(a.value));
      }
      ret.push(this.assignmentToString(a.value));
      a = assignments.next();
      count++;
    }

    if (verbose && verbose > 0) {
      console.log(`Found ${count} satisfying assignments`);
    }

    return ret;
  }
}

module.exports = SATInstance;
