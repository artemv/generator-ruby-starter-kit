'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('javascript:app', function () {

  function moveSourceFiles(from, to) {
    var sourceDir = '../ruby-starter-kit';
    var sourcePath = path.join(__dirname, path.join(sourceDir, from));
    fs.exists(sourcePath, function (exists) {
      if (exists) fs.rename(sourcePath, path.join(__dirname, path.join(sourceDir, to)));
    });
  }

  before(function (done) {
    var renameFile = ['.gitignore', '.npmignore'];
    helpers.run(path.join(__dirname, '../app'))
        .on('ready', function () {
          moveSourceFiles(renameFile[0], renameFile[1]);
        })
        .withOptions({ skipInstall: true })
        .on('end', function () {
          moveSourceFiles(renameFile[1], renameFile[0]);
          done();
        });
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      '.gitignore',
      'Gemfile'
    ]);
  });

});
