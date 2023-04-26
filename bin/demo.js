#!/usr/bin/env node


const { program } = require('commander');
const chalk = require('chalk');//让终端输出的内容更加丰富
const inquirer = require('inquirer');//用户交互工具包
const ora = require('ora');//终端加一个loading效果
const figlet = require("figlet");
const fs = require('fs-extra')

// ---------figlet-------
figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

console.log("肯德基疯狂星期四v我50");
// ----------ora-----------
// const spinner = ora('Loading unicorns').start();

// setTimeout(() => {
// 	spinner.color = 'yellow';
// 	spinner.text = '网络较慢，请稍等...';
// }, 1000);

// setTimeout(() => {
// 	spinner.succeed('下载成功')
// }, 2000);
// setTimeout(() => {
// 	spinner.fail('下载失败')
// }, 3000);




// ----------inquirer-----------
// inquirer
//   .prompt([
//       /* Pass your questions in here 将你的问题放在这里*/
//       {
//           type: 'input',
//           name: 'food',
//           message: '你吃什么?',
//           default:'汉堡包'
//       },
//       {
//         type: 'confirm',
//         name: 'hot',
//         message: '吃不吃辣',
//         default: false
//     }
//   ])
//   .then((answers) => {
//     // Use user feedback for... whatever!!，打印选中的答案
//       console.log(answers)
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       // Prompt couldn't be rendered in the current environment
//     } else {
//       // Something else went wrong
//     }
//   });

// -------chalk--------
// console.log(chalk.red.bold.bgBlue("肯德基疯狂星期四v我50"));




// -------commander---------
// //<>包裹是必填项 []是可选项
// program.name('kfc-vme50-cli').usage('<command> [option]')
// // console.log(process.argv)

// program
//     .option('-v', '--version')
//     .option('-d,--debug', 'output extra debugging')
//     .option('-s,--small', 'small pizza size')
//     .option('-p,--pizza-type <type>', 'flavour of pizza')

// program
//     .command('clone <source> [destination]')//克隆命令
//     .description('clone a repository into a newly created directory')
//     .action((source, destination) => {
//         // 当执行clone命令时触发action
//         console.log('clone command called',source, destination);
//         //clone command called ww.xx.com /dist
//     });



// program.parse(process.argv);
// //获取option的参数
// // const options = program.opts();
// // // kfc-vme50-cli -d
// // // { debug: true }
// // console.log(options)