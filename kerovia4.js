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
    
    function handleGetRequest(req, res) {
        var fileName = req.url;
        var mimeType;
        var statusCode;
        
        if (fileName == '/')
            fileName = settings.default;
        else
            fileName = fileName.substring(1);
        
        var fileContent = loadFile(fileName);
        
        if (fileContent == "") {
            fileContent = loadFile(settings.fourohfour);
            mimeType = mimeTypes(settings.fourohfour);
            statusCode = 404;
        } else {
            mimeType = mimeTypes(fileName);
            statusCode = 200;
        }
        
        // Log activity
        console.log("Serving: "+fileName+", Type: "+mimeType);
        
        // Return requested file
        res.writeHead(statusCode, {"Content-Type": mimeType});
        res.write(fileContent);
        res.end();
    }
    
    function handlePostRequest(req, res) {
        
    }
    
    switch(req.method) {
        case "GET":
            handleGetRequest(req, res);
            break;
        case "POST":
            
            break;
        default:
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write("500 Error");
        res.end();
    }
};

console.log("Starting server on port "+settings.port+".");
http.createServer(webDisplay).listen(settings.port);

