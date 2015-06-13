var loadFile = require('./lib/loadFile.js');
var mimeTypes = require('./lib/mimeTypes.js');
                        
var args = process.argv.slice(2);

var settings = {
    'default': 'index.html',
    'filePath': '/home/andrew/kerovia.net/files',
    'fourohfour': '404.html'
};


console.log(mimeTypes(args[0]));