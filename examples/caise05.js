/**
 * From "Automated Reasoning on Feature Models", by
 *   David Benavides
 *   Pablo Trinidad
 *   Antonio Ruiz-Cortés
 *
 * Extra-functional features are not taken into account.
 */
const SATInstance = require('../index.js');

const his = new SATInstance();
his.parseClause('HIS');
his.parseClause('~HIS Supervision');
his.parseClause('~HIS Control');
his.parseClause('~Services HIS');
his.parseClause('~Supervision Fire');
his.parseClause('~Supervision Intrusion');
his.parseClause('~Flood Supervision');
his.parseClause('~Control Light');
his.parseClause('~Appliances Control');
his.parseClause('~Control Temperature');
his.parseClause('~Services Video Internet');
his.parseClause('Services ~Video');
his.parseClause('Services ~Internet');
his.parseClause('~Internet Power Adsl Wireless');
his.parseClause('Internet ~Power');
his.parseClause('Internet ~Adsl');
his.parseClause('Internet ~Wireless');
his.parseClause('~Power ~Adsl');
his.parseClause('~Power ~Wireless');
his.parseClause('~Adsl ~Wireless');

console.log(`Found ${his.solutions().length} solutions`);

let solution = his.createSolution();

solution.set('Power', true);
console.log(`Found ${his.solutions(solution).length} solutions`);

solution.set('Adsl', true);
console.log(`Found ${his.solutions(solution).length} solutions`);
