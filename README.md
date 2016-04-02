# generator-ruby-starter-kit

[![NPM info][nodei.co]][npm-url]

[![Code Climate](https://codeclimate.com/github/artemv/generator-ruby-starter-kit/badges/gpa.svg)](https://codeclimate.com/github/artemv/generator-ruby-starter-kit)
[![Travis build status](http://img.shields.io/travis/artemv/generator-ruby-starter-kit.svg?style=flat)](https://travis-ci.org/artemv/generator-ruby-starter-kit)
[![Dependency Status](https://david-dm.org/artemv/generator-ruby-starter-kit.svg)](https://david-dm.org/artemv/generator-ruby-starter-kit)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A [Yeoman](http://yeoman.io/) generator for Ruby app boilerplate based on [Ruby Starter Kit](https://github.com/artemv/ruby-starter-kit) (Bundler, Guard, ActiveSupport Logger, Rubocop, RSpec, WebMock, Travis, CodeClimate)

### Installation

* Install Ruby 2.3.0 from https://www.ruby-lang.org/en/downloads/ or via RVM (https://rvm.io/).
* Install `yo` and this generator globally:
```
npm install -g yo generator-ruby-starter-kit
```
* Navigate to the directory you'd like to use for your project and run the generator:
```
cd my-app
yo ruby-starter-kit
```

### Basic Guide

Run the app entry point script:
```
repo=octokit.py bin/app.rb
```

Run the guard dev env tool:
```
guard
```
It will run rubocop on start, will run rubocop inspections on changed files and will re-run all RSpecs and rubocop
inspections if you hit Enter in guard window.

[nodei.co]: https://nodei.co/npm/generator-ruby-starter-kit.png?downloads=true
[npm-url]: https://npmjs.org/package/generator-ruby-starter-kit
