/**
 * Created by Tianyou on 9/17/16.
 */

function incomeCalculator()
{
  /* read average salary */
  const AvgSalary = require('./avgSalary.js');
  const as = new AvgSalary('本市职工月平均工资.csv');

  /* read merit pay */
  const MeritPay = require('./MeritPay.js');
  const meritPay = new MeritPay('绩效工资标准.csv');

  /* read five social insurance and one housing fund rate */
  const Sift = require('./sihf.js');
  const s = new Sift('五险费率.csv');
  const sift = s.getSihf(0.07, as.getEffectiveIncome(27000));
  // for (var type in sift)
  // {
  //   console.log(`${type} : ${sift[type][1]} ${sift[type][0]}`);
  // }

  /* read individual income tax rate */
  const IncomeTax = require('./incomeTax.js');
  const it = new IncomeTax('个税税率.csv');

  /* read employee list from file or typing */
  const employees;

  /*
   calculate income detail for all employees,
   and output to income_details.csv
   */

}

incomeCalculator();