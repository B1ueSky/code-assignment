/**
 * 五险一金 module
 * Created by Tianyou Luo on 9/18/16.
 */

/**
 * Constructor
 *
 * @param csvFilePath
 * @constructor
 */
function Sihf(csvFilePath)
{
  this.csvFile = csvFilePath;
  var fs = require('fs');
  this.rates = {};

  const fileContents = fs.readFileSync(this.csvFile);
  const lines    = fileContents.toString().split('\n');
  const header   = lines[0].toString().split(',');
  const company  = lines[1].toString().split(',');
  const employee = lines[2].toString().split(',');

  for (var i = 1; i < header.length; i++) {
    this.rates[header[i]] = [
      Number(company[i]),
      Number(employee[i]),
    ]
  }
};

function getSihf(hfRate, income)
{
  const endowment0 = income * this.rates['养老保险'][0],
        endowment1 = income * this.rates['养老保险'][1];

  const medicare0 = income * this.rates['医疗保险'][0],
        medicare1 = income * this.rates['医疗保险'][1];

  const unemployment0 = income * this.rates['失业保险'][0],
        unemployment1 = income * this.rates['失业保险'][1];

  const maternity0 = income * this.rates['生育保险'][0],
        maternity1 = income * this.rates['生育保险'][1];

  const injury0 = income * this.rates['工伤保险'][0],
        injury1 = income * this.rates['工伤保险'][1];

  const housing0 = income * hfRate,
        housing1 = income * hfRate;

  const total0 = endowment0 + medicare0 + unemployment0 + maternity0 + injury0 + housing0,
        total1 = endowment1 + medicare1 + unemployment1 + maternity1 + injury1 + housing1;

  return {
    '养老':[endowment0.toFixed(2), endowment1.toFixed(2)],
    '医疗':[medicare0.toFixed(2), medicare1.toFixed(2)],
    '失业':[unemployment0.toFixed(2), unemployment1.toFixed(2)],
    '生育':[maternity0.toFixed(2), maternity1.toFixed(2)],
    '工伤':[injury0.toFixed(2), injury1.toFixed(2)],
    '住房':[housing0.toFixed(2), housing1.toFixed(2)],
    '总计':[total0.toFixed(2), total1.toFixed(2)],
  };
};

Sihf.prototype.getSihf = getSihf;
module.exports = Sihf;