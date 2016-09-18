/**
 * Created by Tianyou on 9/17/16.
 */

function incomeCalculator()
{
  /* read average salary */
  var AvgSalary = require('./avgSalary.js');
  var avgSalary = new AvgSalary('本市职工月平均工资.csv');
  var salary    = avgSalary.getAvg();

  /* read merit pay */
  const meritPay = {'A' : 4000, 'B' : 2000, 'C' : 100, 'D' : 0};

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
  const incomeTaxRates;

  /* read employee list from file or typing */
  const employees;

  /*
   calculate income detail for all employees,
   and output to income_details.csv
   */

}

incomeCalculator();