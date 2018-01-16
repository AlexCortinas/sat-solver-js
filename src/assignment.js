class Assignment {
  constructor(variableTable) {
    this.variableTable = variableTable;
    this.array = [...Array(Object.keys(this.variableTable).length)];
  }

  set(variable, value) {
    this.array[this.variableTable[variable]] = value;
  }
}

module.exports = Assignment;
