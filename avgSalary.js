/**
 * Created by Tianyou Luo on 9/17/16.
 */

/**
 * Constructor
 *
 * @param csvFilePath
 * @constructor
 */
function AveSalary(csvFilePath)
{
  this.csvFile = csvFilePath;
  var fs = require('fs');

  var fileContents = fs.readFileSync(this.csvFile);
  var lines = fileContents.toString().split('\n');

  this.avg = Number(lines[1]);      // get the average salary
  this.upperBound = this.avg * 3;   // upper bound of effective income for 五险一金
  this.lowerBound = this.avg * 0.6; // lower bound of effective income for 五险一金
};

/**
 * Calculate the effective income for 五险一金.
 *
 * @param income
 * @returns {number|*}
 */
function getEffectiveIncome(income)
{
  return income < this.lowerBound ? this.lowerBound : income > this.upperBound ? this.upperBound : income;
}

AveSalary.prototype.getEffectiveIncome = getEffectiveIncome;
module.exports = AveSalary;