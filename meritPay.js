/**
 * Created by Tianyou Luo on 9/17/16.
 */

/**
 * Constructor
 *
 * @param csvFilePath
 * @constructor
 */
function MeritPay(csvFilePath)
{
  this.csvFile = csvFilePath;
  var fs = require('fs');
  this.standard = {};

  var fileContents = fs.readFileSync(this.csvFile);
  var lines = fileContents.toString().split('\n');
  var header = lines[0].toString().split(',');
  var values = lines[1].toString().split(',');

  for (var i = 0; i < header.length; i++) {
    this.standard[header[i]] = Number(values[i]);
  }
};

function getPay(level)
{
  return this.standard[level];
};

MeritPay.prototype.getPay = getPay;
module.exports = MeritPay;