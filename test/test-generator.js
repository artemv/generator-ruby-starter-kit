'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('javascript:app', function () {

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
        .withOptions({ skipInstall: true })
        .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.editorconfig',
      'Gemfile'
    ]);
  });

});
