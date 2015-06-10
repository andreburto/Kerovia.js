var fs = require('fs');

var args = process.argv.slice(2);

var settings = {
    'default': 'index.html',
    'filePath': '/home/andrew/kerovia.net/files',
    'fourohfour': '404.html',
};

function loadFile(fileName) {
    
    function isFile(fileName) {
        try {
            var theFile = settings.filePath + '/' + fileName;
            fs.accessSync(theFile, fs.R_OK);
            return true;
        } catch(ex) {
            return false;
        }
    }
    
    function cleanFileName(fileName) {
        while (fileName.substring(0,1)=='.' || fileName.substring(0,1)=='/') {
            fileName = fileName.substring(1);
        }
        return fileName;
    }
    
    function getFile(fileName) {
        var theFile = cleanFileName(fileName);
        if (isFile(theFile) == false) { return ""; }
        theFile = settings.filePath + '/' + theFile;
        return fs.readFileSync(theFile).toString();
    }
    
    return getFile(fileName);
}

console.log(loadFile(args[0]));