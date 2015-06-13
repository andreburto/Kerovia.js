var Yvonne = (function() {
  
  function Yvonne(display) {
    this.display = display;
  }
  
  Yvonne.prototype.clearNode = function(node) {
    while(node.hasChildNodes()) {
      node.removeChild(node.firstChild);
    }
  };
  
  Yvonne.prototype.makeHtml = function(thumb, full) {
    var divA = document.createElement("div");
    var divB = document.createElement("div");
    var link = document.createElement("a");
    var image = document.createElement("img");
    divA.setAttribute("style", "text-align:center;width:100%;");
    divB.setAttribute("style", "margin:auto;");
    link.setAttribute("href", full);
    link.setAttribute("target", "_blank");
    image.setAttribute("src", thumb);
    image.setAttribute("style", "border:none;")
    link.appendChild(image);
    divB.appendChild(link);
    divA.appendChild(divB);
    return divA;
  };
  
  Yvonne.prototype.start = function() {
    // Setup
    var el = document.getElementById(this.display);
    var scope = this;
    var xmlhttp = null;
    // Construct
    if (window.XMLHttpRequest)
      xmlhttp = new XMLHttpRequest();
    else
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // on blah blah
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        // Clear
        scope.clearNode(el);
        // Process
        var url = eval("("+xmlhttp.responseText+")");
        if (url.msg)
          el.appendChild(scope.makeHtml(url.thumb, url.full));
        else
          el.innerHTML = "ERROR: no images";
      }
    }
    xmlhttp.open("GET", "/img");
    xmlhttp.send();
  };
  
  return Yvonne;

})();