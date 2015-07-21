var http = require('http'),
    fs = require('fs');

var pics = null;
var port = 8090;

request = {
    protocol: 'http:',
    host: 'pics.mytrapster.com',
    path: '/yvonne-list.php?type=json2',
    port: '80'
};

function makeHtml(item) {
    var html = "";
    html = html + "<!DOCTYPE html>\n";
    html = html + "<html>\n<head>";
    html = html + "<meta charset=\"UTF-8\">\n<title>K-Thing</title>\n";
    html = html + "</head>\n<body>\n";
    html = html + "<div style=\"width:100%;text-align:center;\">\n";
    html = html + "<div style=\"margin:auto;\">\n";
    html = html + "<a href=\""+item.full+"\" target=\"_blank\">";
    html = html + "<img src=\""+item.thumb+"\" alt=\""+item.thumb+"\" border=\"0\"/>";
    html = html + "</a><br/><input type=\"button\" onclick=\"location.reload();\" value=\"Reload\" />\n";
    html = html + "</div>\n</div>\n</body>\n</html>\n";
    return html;
}

function randomItem() {
    var n = Math.floor(Math.random() * pics.length);
    if (n >= pics.length) { n = 0; }
    return pics[n];
}

function display(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    if (pics != null)
        if (req.url.substring(1,4) == 'img') {
            var item = randomItem();
            if (item.thumb && item.full)
                item.msg = "ok";
            else
                item.error = "missing data";
            res.write(JSON.stringify(item));
        } else {
            try {
                var theFile = "./files"+req.url;
                fs.accessSync(theFile, fs.R_OK);
                res.write(fs.readFileSync(theFile).toString());
            } catch(ex) {
                res.write(makeHtml(randomItem()));
            }
        }
    else
        res.write("Loading...");
    res.end();
};

function setData(data) {
    var temp = eval('('+data+')'); // Need to fix my source and use JSON
    if (temp.pics.length > 0) {
        pics = temp.pics
    } else {
        console.log("Could not parse JSON");
    }
}

function getData(req, callback) {
    var x = http.get(req, function(res) {
        var body = '';
        res.on('data', function(d) { body += d; });
        res.on('end', function() {
            if (res.statusCode==200) {
                callback(body);
            } else {
                var e = res.statusCode + ": error";
                console.log(e);
            }
        });
    });
    x.end();
}

console.log("Starting server on port "+port+".");
http.createServer(display).listen(port);

console.log("Fetching list");
getData(request, setData);
