/**
 * Created by Tianyou Luo on 9/17/16.
 */

/**
 * IncomeTax Constructor
 *
 * @param csvFilePath
 * @constructor
 */
function IncomeTax(csvFilePath)
{
  this.csvFile = csvFilePath;
  var fs = require('fs');
  this.bounds = [];
  this.rates  = [];

  var fileContents = fs.readFileSync(this.csvFile);
  var lines = fileContents.toString().split('\n');
  var header = lines[0].toString().split(',');
  var values = lines[1].toString().split(',');

  // assuming bounds are listed ascendingly
  for (var i = 0; i < header.length; i++) {
    this.bounds.push(Number(header[i]));
    this.rates.push(Number(values[i]));
  }
};

function getTax(income)
{
  income = income - 3500;
  income = income > 0 ? income : 0;

  // find the section that income belongs to.
  var i;
  for (i = this.bounds.length-1; income <= this.bounds[i]; i--)
    ;
  // accumulate tax for all sections below.
  var tax = (income - this.bounds[i]) * this.rates[i];
  for (; i > 0; i--)
    tax += (this.bounds[i] - this.bounds[i-1]) * this.rates[i-1];

  return tax;
};

IncomeTax.prototype.getTax = getTax;
module.exports = IncomeTax;