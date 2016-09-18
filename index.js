/**
 * Created by Tianyou on 9/17/16.
 */

function incomeCalculator()
{
  /* read average salary */
  const AvgSalary = require('./avgSalary.js');
  const avgSalary = new AvgSalary('本市职工月平均工资.csv');
  const avgSlr    = avgSalary.getAvg();

  /* read merit pay */
  const MeritPay = require('./MeritPay.js');
  const meritPay = new MeritPay('绩效工资标准.csv');

  /* read five social insurance and one housing fund rate */
  const sihfRate = {
    'employer' : {
      'endowment' : 0.21,
      'medicare'  : 0.11,
      'unemployment' : 0.015,
      'maternity' : 0.01,
      'injury'    : 0.005,
    },
    'employee' : {
      'endowment' : 0.08,
      'medicare'  : 0.02,
      'unemployment' : 0.005,
      'maternity' : 0,
      'injury'    : 0,
    },
  };

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