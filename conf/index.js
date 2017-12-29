var co = require('co');
var node_env = process.env.NODE_ENV || 'development';
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var work_dir = path.join(__dirname, '..');

process.env.NODE_PATH = work_dir;

var conf = require('./envs/' + node_env);
var _ = require('lodash');

var node_exec = function(args) {
    return function(done) {
      return exec(args, done);
    };
};

co(function*() {
    conf = _.merge({}, conf, {
      proj_dir: process.env.PROJ_DIR || work_dir,
      rel_dir: process.env.REL_DIR || work_dir,
      api_provider: process.env.API_ADDR || 'http://localhost:3003',
    });

    function render(fileIn, fileOut) {
      var temp = fs.readFileSync(path.join(conf.rel_dir, 'conf', fileIn), { encoding: 'utf8'});
      var compiled = _.template(temp)(conf);
      fs.writeFileSync(path.join(conf.rel_dir, fileOut), compiled);
    }

    render('config.js.tpl', 'src/config.js');
});
