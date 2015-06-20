var http = require('http');
var loadFile = require('./lib/loadFile.js');
var mimeTypes = require('./lib/mimeTypes.js');
var settings = require('./settings.js');


function webDisplay(req, res) {
    
    function handleError(res, msg) {
        if (msg == undefined) { msg = "No message."; }
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(msg);
        res.end();        
    }
    
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
        var body = "";
        // Read data
        req.on('data', function() {
            body += data;
            if (body.length > 1e6)
                handleError(res, "Too much data.");
                req.connection.destroy();
        });
        // Handle request
        req.on('end', function() {
            var outputData = "";
            var postData = qs.parse(body);
            var operation = req.url.substring(1);
            
            
        });
    }
    
    switch(req.method) {
        case "GET":
            handleGetRequest(req, res);
            break;
        case "POST":
            handlePostRequest(req, res);
            break;
        default:
            handleError(res, "Improper method.");
    }
};

console.log("Starting server on port "+settings.port+".");
http.createServer(webDisplay).listen(settings.port);

