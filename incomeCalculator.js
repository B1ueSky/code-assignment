/**
 * Created by Tianyou Luo on 9/18/16.
 */

function IncomeCalculator()
{
  /* read average salary */
  const AvgSalary = require('./avgSalary.js');
  this.as = new AvgSalary('本市职工月平均工资.csv');

  /* read merit pay */
  const MeritPay = require('./MeritPay.js');
  this.mp = new MeritPay('绩效工资标准.csv');

  /* read five social insurance and one housing fund rate */
  const Sift = require('./sihf.js');
  this.s = new Sift('五险费率.csv');

  /* read individual income tax rate */
  const IncomeTax = require('./incomeTax.js');
  this.it = new IncomeTax('个税税率.csv');
  }

function calculate(name, income, meritType, hfRate, writeTo)
{
  const merit = this.mp.getPay(meritType);
  const sift  = this.s.getSihf(hfRate, this.as.getEffectiveIncome(income));
  const incomeBeforeTax = (income + merit - sift[sift.length-1]['个人']).toFixed(2);
  const tax = (this.it.getTax(incomeBeforeTax)).toFixed(2);
  const incomeAfterTax = (incomeBeforeTax - tax).toFixed(2);

  /*
   calculate income detail for all employees,
   and output to console.
   */

  if (writeTo != null)    // write to csv file
  {
    const fs = require('fs');
    var header = `类型,${name},单位\n`;
    var line;
    fs.appendFileSync(writeTo, header);
    for (var i = 0; i < sift.length; i++)
    {
      line = `${sift[i]['类型']},${sift[i]['个人']},${sift[i]['单位']}\n`;
      fs.appendFileSync(writeTo, line);
    }

    header = '姓名,岗位工资,绩效工资,五险一金（个人）,五险一金（单位）,税前收入,扣税,税后收入\n';
    fs.appendFileSync(writeTo, header);
    line = `${name},${income},${merit},${sift[sift.length-1]['个人']},${sift[sift.length-1]['单位']},${incomeBeforeTax},${tax},${incomeAfterTax}\n`;
    fs.appendFileSync(writeTo, line);
  }
  else    // display on screen
  {
    console.log(`${name}工资单如下：`);
    console.log('第一部分：五险一金');
    console.log(`|类型|${name}|单位|`);
    for (var i = 0; i < sift.length; i++)
    {
      console.log(`|${sift[i]['类型']}|${sift[i]['个人']}|${sift[i]['单位']}|`);
    }

    console.log('第二部分：收入详情');
    console.log('|姓名|岗位工资|绩效工资|五险一金（个人）|五险一金（单位）|税前收入|扣税|税后收入|');
    console.log(`|${name}|${income}|${merit}|${sift[sift.length-1]['个人']}|${sift[sift.length-1]['单位']}|${incomeBeforeTax}|${tax}|${incomeAfterTax}|`);
    console.log();
  }
}

IncomeCalculator.prototype.calculate = calculate;
module.exports = IncomeCalculator;