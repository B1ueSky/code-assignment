/**
 * Created by Tianyou on 9/17/16.
 */


function onErr(err) {
  console.log(err);
  return 1;
}

function start()
{
  const IncomeCalculator = require('./incomeCalculator.js');
  const ic = new IncomeCalculator();

  // get info from user
  var prompt = require('prompt');
  prompt.start();

  prompt.get(['从员工名单文件中读取员工信息？（Y/N）'], function (err, result)
  {
    var employees = [];
    var header = [];
    var lines = [];
    if (err) { return onErr(err); }
    if (result['从员工名单文件中读取员工信息？（Y/N）'].toLowerCase() === 'y')
    {
      var fs = require('fs');
      var fileContents = fs.readFileSync('员工名单.csv');
      lines = fileContents.toString().split('\n');
      header = lines[0].toString().split(',');

      for (var i = 1; i < lines.length; i++)
      {
        var employee = {};
        for (var j = 0; j < header.length; j++)
        {
          var line = lines[i].toString().split(',');
          employee[header[j]] = line[j];
        }
        employees.push(employee);
      }

      employees.forEach((employee) => {
        ic.calculate(employee['姓名'], Number(employee['基本工资']), employee['绩效评分'], Number(employee['公积金']));
      });
    }
    else
    {
      console.log('请输入员工信息（格式：姓名,基本工资,绩效评分,公积金）');

      prompt.get(['员工:'], function (err, result)
      {
        if (err) { return onErr(err); }
        var line = result['员工:'].toString().split(',');
        var employee = {
          '姓名' : line[0],
          '基本工资' : line[1],
          '绩效评分' : line[2],
          '公积金' : line[3],
        };
        ic.calculate(employee['姓名'], Number(employee['基本工资']), employee['绩效评分'], Number(employee['公积金']));
      });
    }
  });
}

start();
