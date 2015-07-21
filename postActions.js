var postActions = [
    {'name': 'test',
     'func': function(res, qs) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("You are: "+qs.whoareyou+".\n");
        res.write("You are in: "+qs.whereareyou+".\n");
        res.end();
     }},
];

module.exports = postActions;