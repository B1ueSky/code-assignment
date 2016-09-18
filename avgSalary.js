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

  this.avg = Number(lines[1]);    // get the average salary
};

function getAvg()
{
  return this.avg;
};

function getUpperBound()
{
  return 3 * this.avg;
}

function getLowerBound()
{
  return 0.6 * this.avg;
}

AveSalary.prototype.getAvg = getAvg;
AveSalary.prototype.getUpperBound = getUpperBound;
AveSalary.prototype.getLowerBound = getLowerBound;
module.exports = AveSalary;