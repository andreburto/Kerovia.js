var querystring = require('querystring'),
    http = require('http'),
    url = require('url');
var loadFile = require('./lib/loadFile.js');
var mimeTypes = require('./lib/mimeTypes.js');
var postActions = require('./postActions.js');
var settings = require('./settings.js');

function webDisplay(req, res) {
    
    function logRequest(path, method) {
        console.log("Method: "+method+", Path: "+path);
    }
    
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
        logRequest(fileName, "GET");
        
        // Return requested file
        res.writeHead(statusCode, {"Content-Type": mimeType});
        res.write(fileContent);
        res.end();
    }
    
    function handlePostRequest(req, res) {
        var body = "";
        // Read data
        req.on('data', function(data) {
            body += data;
            if (body.length > 1e8)
                handleError(res, "Too much data.");
        });
        // Handle request
        req.on('end', function() {
            var outputData = "";
            var postData = querystring.parse(body.toString());
            var operation = req.url.substring(1);
            
            // Log request
            logRequest(operation, "POST");
            
            // Find Output function
            for(var cnt = 0; cnt < postActions.length; cnt++) {
                if (postActions[cnt].name == operation) {
                    postActions[cnt].func(res, postData);
                    return;
                }
            }
            
            // If there's no function
            handleError(res, "No such action as: "+operation)
        });
    }
    
    switch(req.method) {
        case "GET":
            handleGetRequest(req, res);
            break;
        //case "POST":
        //    handlePostRequest(req, res);
        //    break;
        default:
            handleError(res, "Improper method.");
    }
};

console.log("Starting server on port "+settings.port+".");
http.createServer(webDisplay).listen(settings.port);

