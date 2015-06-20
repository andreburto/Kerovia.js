var Test = (function() {
    function Test() {
        this.counter = 0;
        this.value = 1;
    }

  Test.prototype.Add = function() {
    this.counter += this.value;
  };

  Test.prototype.Flip = function() {
    this.value *= -1;
  };

  Test.prototype.Go = function(scope) {
    var body = document.getElementsByTagName("h1")[0];
    body.innerHTML = scope.counter;
    scope.Add();
    if (scope.counter == 10)
      scope.Flip();
    else if (scope.counter==0)
      scope.Flip();
    setTimeout(scope.Go, 1000, scope);
  };

  return Test;
})();