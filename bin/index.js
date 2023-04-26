#!/usr/bin/env node


const { program } = require('commander');
const chalk = require('chalk');//让终端输出的内容更加丰富
const inquirer = require('inquirer');//用户交互工具包
const ora = require('ora');//终端加一个loading效果
const figlet = require("figlet");
const fs = require('fs-extra')
const path = require('path')
const gitClone = require('git-clone');

const projectList = {
    'vue': "git@github.com:kfc-vme50/vue-template.git",
    "react": 'git@github.com:kfc-vme50/react-template.git',
    'react&ts': "git@github.com:kfc-vme50/react-template-ts.git",
    'vue&ts': "git@github.com:kfc-vme50/vue-template-ts.git"
}

// 首行提示
program.name('kfc-vme50-cli').usage('<command> [options]')

//版本号
program.version(`v${require('../package.json').version}`);

//命令
//创建项目的命令
program
    .command('create <app-name>')
    .description('创建一个新的项目')
    .action(async function (name) {
        //创建项目的逻辑

        //创建一个名字为name的文件夹，把我们模板项目的代码放到这个文件夹下

        //1.先判断有没有名字为name的文件夹
        // console.log(path.join(process.cwd(),name));

        const targetPath = path.join(process.cwd(),name)
        if (fs.existsSync(path.join(process.cwd(),name))) {
            // 存在的话就问是替换还是结束
            const awsaner = await inquirer.prompt({
                type: 'confirm',
                default: false,
                name:'overwrite',
                message:'是否覆盖之前的文件夹?'
            })
            // console.log(awsaner)
            // { overwrite: false }

            if (awsaner.overwrite) {
                //移除
                fs.remove(targetPath)
                console.log('删除成功')
            } else {
                //直接返回 去取一个新的名字
                return;
            }
        } 
            // 不存在就继续新建
            const res = await inquirer.prompt([{
                type: 'list',
                name: 'type',
                choices: [
                    {
                        name: 'vue',
                        value:'vue'
                    },
                    {
                        name: 'react',
                        value:'react'
                    }
                ],
                message:'选择什么框架去新建项目'
            },
            {
                type: 'list',
                name: 'ts',
                choices: [
                    {
                        name: '是',
                        value:true
                    },
                    {
                        name: '否',
                        value:false
                    }
                ],
                message:'是否使用ts?'
            }
            ])
            
            console.log(res)
            const key = res.type + (res.ts ? '&ts' : '');
            const spinner = ora('下载中').start();
            gitClone(projectList[key], name, { checkout: 'main' }, function (err) {
                if (err) {
                    console.log('下载失败');
                    spinner.fail('下载失败，请稍后重试');
                } else {
                    console.log('下载成功')
                    spinner.succeed('下载成功');
                    //删除.git文件夹
                    fs.remove(path.join(targetPath, '.git'))
                    
                    console.log('Done，now run:')
                    console.log(chalk.green(`\n cd ${name}`))
                    console.log(chalk.green(`\n npm install`))
                    console.log(chalk.green(`\n npm run dev\n`))
                }
            })
        console.log(name)
    })

// 给help信息添加提示
program.on('--help', function () {
    console.log(
        figlet.textSync("kfc-vme50!", {
          font: "Ghost",
          horizontalLayout: "default",
          verticalLayout: "default",
          width: 200,
          whitespaceBreak: true,
        })
      );
})

program.parse(process.argv);