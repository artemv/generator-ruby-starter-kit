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

  detectRvm: function () {
    var spawn = require('child_process').spawn;
    var me = this;
    me.rvmMode = true;
    var rvm = spawn('rvm', ['--version']);

    rvm.on('error', function () {
      me.rvmMode = false;
    });
  },

  install: function () {
    var prefix = (this.rvmMode ? 'rvm use `cat .ruby-version` && ' : '');
    this.log('Installing bundler gem..');
    this.runInstall(prefix + 'gem', 'bundler');
    this.log("Installing dependent gems with 'bundle install'..");
    this.runInstall(prefix + 'bundle');
    this.log(yosay("That's it. Happy hacking!"));
  }
});