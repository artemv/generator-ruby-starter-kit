'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');
var run = require('gulp-run');

module.exports = yeoman.generators.Base.extend({

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
        if (file === 'npmignore') {
          dest = '.' + file;
        }
        this.fs.copy(
            this.templatePath(file),
            this.destinationPath(dest)
        );
      }, this);
      var cmd = new run.Command('bundle install');
      cmd.exec();
      done();
    }.bind(this));
  },

  install: function () {
    this.npmInstall();
  }

});