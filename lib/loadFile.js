var fs = require('fs');

function loadFile(fileName, path) {
    var filePath = "./files";
    
    function isFile(fileName) {
        try {
            var theFile = filePath + '/' + fileName;
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
    
    function getFile(fileName, path) {
        if (path) { filePath = path; }
        var theFile = cleanFileName(fileName);
        if (isFile(theFile) == false) { return ""; }
        theFile = filePath + '/' + theFile;
        return fs.readFileSync(theFile).toString();
    }
    
    return getFile(fileName, path);
}

module.exports = loadFile;