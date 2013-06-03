var max = 0;
var $mealNote;

$(document).ready(function() {
  safari.self.addEventListener("message", getAnswer, false);
  safari.self.tab.dispatchMessage("getmax");
  $(".bannergreeting").append("<span id='doMealCalc'>Meals</span>");
  $("#doMealCalc").click(doMealCalc);
  $("#bannerimage").parent().append("<span id='mealnote'></span>");
  $mealNote = $("#mealnote");
});

function getAnswer(theMessageEvent) {
  if (theMessageEvent.name === "themax") {
    max=theMessageEvent.message;
  }
}

function doMealCalc() {
  console.log("Doing meal calc");
  var dat = {};
  $(".x-grid3-row-table").each(function() {
    var $this = $(this);
    var typ = $this.find(".x-grid3-col-ExpNameCol").find(".greenBold").text();
    if (typ === "Meals") {
      var dt = $this.find(".x-grid3-col-ExpDateIconsCol").text();
      var amt = $this.find(".x-grid3-col-AdjustedAmount").text();
      var number = parseFloat(amt.replace(/[^0-9]+/g,""));
      var tot = dat[dt];
      if (!tot)
        tot = 0;
      tot = tot + number;
      dat[dt] = tot;      
    }
  });
  var txt = "";
  for (var dt in dat) {
    var amt = dat[dt];
    if (max > 0 && amt > max) {
      txt = txt + "<span class='mbad'>" + dt + " $" + (amt/100) + " ("
        + ((max - amt)/100) + ")</span>, ";
    } else {
      txt = txt + "<span class='mok'>" + dt + " $" + (amt/100) + "</span>, ";
    }
  }
  $mealNote.html(txt);
}
