'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.sourceRoot(path.join(this.sourceRoot(), '../../ruby-starter-kit'));
  },

  prompting: function () {
    this.log(yosay(
            'Welcome to the ' + chalk.green('Ruby Starter Kit') + ' generator!'
    ));
  },

  writing: function () {
    var done = this.async();
    glob('**/*', { cwd: this.sourceRoot(), dot: true }, function (err, files) {
      if (err) {
        this.log('Error:', err.message);
        return done();
      }
      files.forEach(function (file) {
        var dest = file;
        if (file === '.npmignore') {
          dest = '.gitignore';
        }
        this.fs.copy(
            this.templatePath(file),
            this.destinationPath(dest)
        );
      }, this);
      done();
    }.bind(this));
  },

  detectFeature: function (testCommand) {
    if (!testCommand) return;
    var result = this.spawnCommandSync(testCommand, ['--version'], {stdio: 'ignore'});
    return !result.error;
  },

  _promptUserWithGitInit: function() {
    var done = this.async();
    this.prompt({
      type: 'confirm',
      name: 'initGit',
      message: 'Initialize Git repo?',
      default: true
    }, function (answers) {
      if (answers.initGit) {
        this.log("Initializing Git repo..");
        this.spawnCommandSync('git', ['init']);
      }
  //    this._sayGoodbye();
      done();
    }.bind(this));
  },

  _showRvmInstructions: function () {
    this.log("You are using RVM. Please run these commands manually after this installation is complete:");
    this.log();
    this.log("rvm use `cat .ruby-version`");
    this.log("gem install bundler");
    this.log("bundle install");
    this.log();
  },

  _installGems: function () {
    this.log('Installing bundler gem..');
    this.spawnCommandSync('gem', ['install', 'bundler']);
    this.log("Installing dependent gems with 'bundle install'..");
    this.spawnCommandSync('bundle', ['install']);
  },

  install: {

    bundle: function() {
      if (this.detectFeature('rvm')) {
        this._showRvmInstructions();
      } else {
        this._installGems();
      }
    },

    gitInit: function() {
      if (this.detectFeature('git')) {
        var fs = require('fs');
        fs.exists('.git', function (exists) {
          if (!exists) {
            this._promptUserWithGitInit()
          } else {
            this._sayGoodbye();
          }
        }.bind(this));
      } else {
        this._sayGoodbye();
      }
    }
  },

  _sayGoodbye: function() {
    this.log(yosay("That's it. " + chalk.green("Happy hacking!")));
  }
});