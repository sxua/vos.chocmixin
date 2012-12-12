var vos = require('./lib/vos');

Hooks.setShortcutForMenuItem("File/Save", "control-command-s");
Hooks.addMenuItem('File/Validate On Save', 'command-s', function() { vos.validate(); });
Hooks.addMenuItem('Actions/Validate On Save/Validate', 'command-s', function() { vos.validate(); });
Hooks.addMenuItem('Actions/Validate On Save/Report an Issue', null, function() { vos.bugreport(); });