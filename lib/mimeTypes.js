function mimeTypes(fileName) {
    var types = [{'ext': 'html',    'mime': 'text/html'},
                 {'ext': 'txt',     'mime': 'text/plain'},
                 {'ext': 'js',      'mime': 'application/javascript'},
                 {'ext': 'json',    'mime': 'application/json'},
                 {'ext': 'css',     'mime': 'text/css'}];
    
    function getFileName(fn) {
        var parts = fn.split("/");
        return parts[parts.length - 1];
    }
    
    function getExtension(fn) {
        var parts = fn.split(".");
        return parts[parts.length - 1];
    }
    
    function findMime(ext) {
        for(var c = 0; c < types.length; c++) {
            if (ext == types[c].ext) {
                return types[c].mime;
            }
        }
        return findMime("txt");
    }
    
    function getType(fn) {
        if (fn == undefined) { fn = ""; }
        if (fn.indexOf('/') > -1) { fn = getFileName(fn); }
        if (fn.indexOf('.') > -1) { fn = getExtension(fn); }
        return findMime(fn);
    }
    
    return getType(fileName);
}

module.exports = mimeTypes;