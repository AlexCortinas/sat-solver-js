/**
 * From "SAT-based Analysis of Feature Models is Easy", by
 *   Mendonca, Marcilio
 *   Wąsowski, Andrzej
 *   Czarnecki, Krzysztof
 */
const SATInstance = require('../index.js');

const search = new SATInstance();
search.parseClause('search-engine');
search.parseClause('~page-translation search-engine');
search.parseClause('~search-engine doc-type');
search.parseClause('~search-by-lang search-engine');
search.parseClause('~page-preview search-engine');
search.parseClause('~doc-type html');
search.parseClause('~image doc-type');
search.parseClause('~video doc-type');
search.parseClause('~image gif svg');
search.parseClause('image ~gif');
search.parseClause('image ~svg');
search.parseClause('~gif ~svg');
search.parseClause('~search-by-lang spanish english french');
search.parseClause('search-by-lang ~spanish');
search.parseClause('search-by-lang ~english');
search.parseClause('search-by-lang ~french');
search.parseClause('~search-by-lang page-translation');
search.parseClause('~page-preview ~svg');

console.log(`Found ${search.solutions().length} solutions`);

let solution = search.createSolution();

solution.set('english', true);
console.log(`Found ${search.solutions(solution).length} solutions`);

solution.set('french', true);
console.log(`Found ${search.solutions(solution).length} solutions`);

solution.set('gif', true);
console.log(`Found ${search.solutions(solution).length} solutions`);
