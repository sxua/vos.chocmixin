/* Module requirements */

var fs = require('fs'),
    exec = require('child_process').exec,
    temp = require('temp');

/* Validate On Save */

var VOS = {
  version: "0.0.1"
};

VOS.validate = function() {
  var scope = Document.current().rootScope();

  var scopes = {
    ruby: { is: /ruby\.source/ },
    javascript: { is: /js\.source/ }
  };

  for (var lang in scopes) {
    if (scope.match(scopes[lang].is) && (!scopes[lang].hasOwnProperty('not') || !(scope.match(scopes[lang].not)))) {
      VOS.Validate[lang]();
      break;
    }
  }
};

VOS.tempFile = function(callback) {
  temp.open('vos.tmp', function(error, info) {
    fs.write(info.fd, Document.current().text);
    fs.close(info.fd, function(error) {
      if (callback) callback(info);
    });
  });
};

VOS.output = function(options) {
  options || (options = {});
  options.title = "Validate On Save - " + options.lang;

  if (options.result.match(options.matchOk)) {
    options.body = 'Syntax OK';
  } else {
    options.body = 'Syntax Error on Line: ' + options.result.match(options.matchLine)[1];
  }

  if (Alert.notify !== 'undefined') {
    Alert.notify({
      title: options.title,
      body: options.body
    });
  } else {
    Alert.show(options.title, options.body, ['OK']);
  }
  Document.current().performSave();
};

VOS.bugreport = function() {
  exec("/usr/bin/open 'https://github.com/sxua/vos.chocmixin/issues'", function(error, stdout, stderr) {});
};

VOS.Validate = {
  javascript: function() {
    VOS.tempFile(function(info) {
      exec(__dirname + "/.bin/jsl -process " + info.path + " -nologo", function(error, stdout, stderr) {
        var filename = info.path.split('/').pop();
        VOS.output({
          lang: 'JavaScript',
          result: stdout.replace(filename, '').trim(),
          matchOk: /0 error\(s\)\, 0 warning\(s\)/i,
          matchLine: /\((\d+)\):\s/i
        });
      });
    });
  }
};

/* Exports */

exports.validate = VOS.validate;
exports.bugreport = VOS.bugreport;