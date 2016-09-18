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

function calculate(income, meritType, hfRate)
{
  const merit = this.mp.getPay('A');
  const sift  = this.s.getSihf(0.07, this.as.getEffectiveIncome(income));
  const incomeBeforeTax = (income + merit - sift['总计'][1]).toFixed(2);
  const tax = (this.it.getTax(incomeBeforeTax)).toFixed(2);
  const incomeAfterTax = (incomeBeforeTax - tax).toFixed(2);

  /*
   calculate income detail for all employees,
   and output to income_details.csv
   */
  for (var type in sift)
  {
    console.log(`${type} : ${sift[type][1]} ${sift[type][0]}`);
  }
  console.log(`小明|${income}|${merit}|${sift['总计'][1]}|${sift['总计'][0]}|${incomeBeforeTax}|${tax}|${incomeAfterTax}`);
}

IncomeCalculator.prototype.calculate = calculate;
module.exports = IncomeCalculator;