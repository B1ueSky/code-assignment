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

  var query0 = '是否从员工名单文件中读取员工信息？（Y/N）';
  var query1 = '请输入一名员工信息（格式：姓名,基本工资,绩效评分,公积金）';
  var query2 = '结果打印到屏幕输入 1 ，输出到result.csv输入 2 ：';

  // ask for input source
  prompt.get([query0], function (err, result)
  {
    var employees = [];
    var header = [];
    var lines = [];
    if (err) { return onErr(err); }
    if (result[query0].toLowerCase() === 'y')
    {
      // get and parse the input csv file
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

      // ask for output destination
      prompt.get([query2], function (err, result)
      {
        if (err) { return onErr(err); }
        var filepath;
        if (result[query2].includes('2'))
          filepath = 'result.csv';
        else
          filepath = null;
        employees.forEach((employee) => {
          ic.calculate(employee['姓名'], Number(employee['基本工资']), employee['绩效评分'], Number(employee['公积金']), filepath);
        });
      });
    }
    else
    {
      // ask for typing employee info
      prompt.get([query1], function (err, result)
      {
        if (err) { return onErr(err); }
        var line = result[query1].toString().split(',');
        var employee = {
          '姓名' : line[0],
          '基本工资' : line[1],
          '绩效评分' : line[2],
          '公积金' : line[3],
        };

        // ask for output destination
        prompt.get([query2], function (err, result)
        {
          if (err) { return onErr(err); }
          var filepath;
          if (result[query2].includes('2'))
            filepath = 'result.csv';
          else
            filepath = null;
          ic.calculate(employee['姓名'], Number(employee['基本工资']), employee['绩效评分'], Number(employee['公积金']), filepath);
        });
      });
    }
  });
}

start();
