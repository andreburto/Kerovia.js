var http = require('http'),
    fs = require('fs');

var settings = {
    'default': 'test.html',
    'filePath': '/home/andrew/kerovia.net/files',
    'fourohfour': '404.html',
    'port': 80
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

function webDisplay(req, res) {
    
    function handleRequest(req, res) {
        var fileName = req.url;
        
        if (fileName == '/')
            fileName = settings.default;
        else
            fileName = fileName.substring(1);
        
        var fileContent = loadFile(fileName);
        
        if (fileContent == "")
            fileContent = loadFile(settings.fourohfour);
        
        console.log("Serving: "+fileName);
        
        res.writeHead(200, {"Content-Type": "text/html"});
        res.write(fileContent);
        res.end();
    }
    
    handleRequest(req, res);
};

console.log("Starting server on port "+settings.port+".");
http.createServer(webDisplay).listen(settings.port);

