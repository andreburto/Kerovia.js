var http = require('http');
var loadFile = require('./lib/loadFile.js');
var mimeTypes = require('./lib/mimeTypes.js');

var settings = {
    'default': 'test.html',
    'filePath': '/home/andrew/kerovia.net/files',
    'fourohfour': '404.html',
    'port': 80
};

function webDisplay(req, res) {
    
    function handleRequest(req, res) {
        var fileName = req.url;
        var mimeType;
        
        if (fileName == '/')
            fileName = settings.default;
        else
            fileName = fileName.substring(1);
        
        var fileContent = loadFile(fileName);
        
        if (fileContent == "") {
            fileContent = loadFile(settings.fourohfour);
            mimeType = mimeTypes(settings.fourohfour);
        } else {
            mimeType = mimeTypes(fileName);
        }
        
        // Log activity
        console.log("Serving: "+fileName+", Type: "+mimeType);
        
        // Return requested file
        res.writeHead(200, {"Content-Type": mimeType});
        res.write(fileContent);
        res.end();
    }
    
    handleRequest(req, res);
};

console.log("Starting server on port "+settings.port+".");
http.createServer(webDisplay).listen(settings.port);

