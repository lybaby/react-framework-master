#!/usr/bin/env node

const path = require('path');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const inquirer = require('inquirer');
const ofs = require('fs');
const os = require('os');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const helper = require('./helper');
const execPath = process.cwd();
const yargs = require('yargs');
const fss = require('fs-extra');

const pack = require('./template/package.json');

const store = memFs.create();
const fs = editor.create(store);

const templatePath = (p = '') => path.resolve(__dirname, './template', p);
let destPath = (p = '') => path.resolve(execPath, p);

const appname = (p = execPath) => path.basename(p).toLocaleLowerCase().replace(' ', '_');

const welcome = (() => {
  const p = fs.readJSON(path.join(__dirname, 'package.json'));
  return `Welcome to use React/Webpack generator v${p.version}`;
})();

const copy = (from, to = from) => {
  fs.copy(templatePath(from), destPath(to));
};

const copyTpl = (opt, from, to = from) => {
  fs.copyTpl(templatePath(from), destPath(to), opt);
};

const appInfo = ({ name, redux,component }) => {
  const s = (value, msg) => value ? chalk.green(`+ ${msg}`) : chalk.gray(`- ${msg}`);
  return `Please confirm your App's info.
---------------------------------
  App Name : ${chalk.green(name)}
  Path : ${chalk.green(destPath())}
  Modules  : 
    ${s(redux, 'x  Redux')}
    ${s(component, 'x Component')}
---------------------------------
  Are you sure?`;
};

class Main {

  constructor() {
    this.props = {};
    const u = helper.getGitUser();
    this.user = { userName: u.name || '', email: u.email || '' };
    this.isNeedCreatePath = false;

    this.initArgsv();

    if (process.argv.length < 3) {
      this.yargs.showHelp();
    } else {
      if (this.argv._.length > 0) {
        this.handlPathCreate();
      } else {
        this.showAppInfo();
      }
    }
  }

  initArgsv() {
    const opt = {
      'x': {
        alias: 'redux',
        describe: 'Use redux',
      },
      'c':{
          alias: 'component',
          describe: 'Use component',
      },
      't': {
        alias: 'testing',
        describe: 'Is need testing',
      },
      'y': {
        describe: 'Force to confirm',
      },
      'i': {
        alias: 'install',
        describe: 'Install all dependencies',
      },
    };

    this.yargs = yargs.usage(`${welcome}\n\nUsage: re|react [path] [options]`)
      .options(opt)
      .locale('en')
      .help('h');

    this.argv = this.yargs.argv;
  }

  handlPathCreate() {
    destPath = (p = '') => path.resolve(execPath, this.argv._[0], p);
    this.argv.name = this.argv.name || appname(path.resolve(execPath, this.argv._[0]));

    try {
      ofs.accessSync(destPath()); // 是否能访问目的路径

      if (this.argv.y) {
        this.showAppInfo();
        return;
      }

      inquirer.prompt({
        type: 'confirm',
        name: 'isOk',
        message: `"${destPath()}" already exists, overwrite?`,
        default: true
      }).then((p) => {
        if (p.isOk) {
          // 如果确定覆盖,继续创建
          this.showAppInfo();
        } else {
          // 否则 退出
          console.log('abort!');
          process.exit(1);
        }
      });
    } catch (e) {
      // 不存在当前路径，则创建
      this.isNeedCreatePath = true;
      this.showAppInfo();
    }
  }

  showAppInfo() {
    const { name = appname(), redux = false,component = false, testing = false, y = false } = this.argv;
    this.props = { name, redux, testing,component };

    if (typeof name !== 'string') {
      console.log(`"${name}" isn't a valid project name.`);
      process.exit(1);
    }

    if (y) {
      if (this.isNeedCreatePath) helper.mkdir(destPath());
      this.writing();
      return;
    }

      console.log(this.props);
    // show app info
    inquirer.prompt({
      type: 'confirm',
      name: 'isOk',
      message: appInfo(this.props),
      default: true
    }).then((props) => {
      if (props.isOk) {
        if (this.isNeedCreatePath) helper.mkdir(destPath());
        this.writing();
      }
    });

  }

  copyReactSource() {
    copy('src/css');
    const { redux, component } = this.props;
    console.log(this.props);

    if (redux) {
      copy('src/redux/action.js','src/redux/action.js');
      copy('src/redux/action-types.js', 'src/redux/action-types.js');
      copy('src/redux/reducer.js','src/redux/reducer.js');
    }

   if (redux) {
      copy('src/app-redux.jsx', 'src/app.jsx');
    } else {
      copy('src/app.jsx', 'src/app.jsx');
    }

    if(component){
        copy('src/router/router-component.jsx', 'src/router/router.jsx');
        copy('src/app-component.jsx', 'src/app.jsx');
        fss.copy(templatePath('./src/components'), destPath('./src/components'), (err) => {
            if (err) {
                return console.error(err);
            }
        });
        fss.copy(templatePath('./src/views/home'), destPath('./src/views/home'), (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }else {
        copy('src/router/router.jsx', 'src/router/router.jsx');
        copy('src/app.jsx', 'src/app.jsx');
        fss.copy(templatePath('./src/views/testing'), destPath('./src/views/testing'), (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }


    copy('src/registerServiceWorker.js', 'src/registerServiceWorker.js');
    // copy index.jsx
    copy('src/index.js', 'src/index.js');
  }


  writing() {
    const startTime = (new Date()).getTime();

    try {
      // 复制静态文件
      fss.copy(templatePath('./build'), destPath('./build'), (err) => {
        if (err) {
          return console.error(err);
        }
      });

      fss.copy(templatePath('./config'),destPath('./config'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.copy(templatePath('./src/common'),destPath('./src/common'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.copy(templatePath('./src/css'),destPath('./src/css'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.copy(templatePath('./src/images'),destPath('./src/images'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.copy(templatePath('./src/service'),destPath('./src/service'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.copy(templatePath('./public'),destPath('./public'),(err)=>{
          if (err) {
              return console.error(err);
          }
      });

      fss.ensureDir(destPath('./public_src'));

      // 写入 package.json
      //fs.write(destPath('package.json'), pack.getPackageJSON(Object.assign({}, this.props, this.user)));
      copy('./package.json')
      copy('.eslintrc.js', '.eslintrc.js');
      // 复制 React 代码文件
      this.copyReactSource();


      fs.commit(() => { });

      console.log(`${chalk.green('success')} All files created!`);
      console.log(`Done in ${(new Date()).getTime() - startTime} ms.`);

      this.install();

    } catch (e) {
      console.error(chalk.red('error ') + e.message);
    }
  }

  install() {
    const { i = false } = this.argv;
    if (i) {
      const dest = destPath();
      // yarn install
      spawn('yarn', ['install'], { stdio: 'inherit', cwd: dest })
        .on('close', function (code) {
          // npm run start
          if (code === 0) {
            console.log('Run npm start script, waiting ...');
            spawn('npm', ['start'], { stdio: 'inherit', cwd: dest })
          }
        });
    }
  }

}

new Main();


