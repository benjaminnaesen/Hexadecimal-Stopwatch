function Stopwatch(timer) {
  var time = 0;
  var interval;
  var offset;

  this.status = false;

  function update() {
    if (this.status)
      time += delta();

    var formattedTime = formatTime(time);
    timer.textContent = formattedTime;
  }

  function delta() {
    var now = Date.now();
    var timePassed = now - offset;
    offset = now;
    return timePassed;
  }

  function formatTime(timeInMilliseconds){
    var time = new Date(timeInMilliseconds);
    var hours = (time.getHours() - 1).toString();
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    hours = checkInput(hours);
    minutes = checkInput(minutes);
    seconds = checkInput(seconds);
    function checkInput(input) {
      if (input.length < 2) {
        input = '0' + input;
        return input;
      } else
        return input;
    }

    while (milliseconds.length < 3)
      milliseconds = '0' + milliseconds;

    var hex = '#' + hours + minutes + seconds;

    function inverse(hex) {
      if (hex.length != 7 || hex.indexOf('#') != 0) {
        return null;
      }
      var r = (255 - parseInt(hex.substring(1, 3), 16)).toString(16);
      var g = (255 - parseInt(hex.substring(3, 5), 16)).toString(16);
      var b = (255 - parseInt(hex.substring(5, 7), 16)).toString(16);
      var inverse = "#" + pad(r) + pad(g) + pad(b);

      return inverse;
    }

    function pad(num) {
      if (num.length < 2) {
        return "0" + num;
      } else {
        return num;
      }
    }

    var inverseHex = inverse(hex)
    document.body.style.backgroundColor = inverseHex;
    document.getElementById('hex').innerHTML = inverseHex;

    return hours + ' : ' + minutes + ' : ' + seconds + ' . ' + milliseconds;
  }

  this.start = function() {
      if (!this.status) {
        interval = setInterval(update.bind(this), 1);
        offset = Date.now();
        this.status = true;
        reset.disabled = true;
      }
  };

  this.stop = function() {
    if (this.status) {
      clearInterval(interval);
      interval = null;
      this.status = false;
      reset.disabled = false;
    }

  };

  this.reset = function() {
    if (!this.status) {
      time = 0;
      update();
    }
  };
}
