$(document).ready(() => {
  
  var fadeColor = (element, h) => {
    element.css('backgroundColor', 'hsl('+h+',100%,50%)');

    var d = 1000;
    for(var i=50; i<=100; i=i+0.5){
      d  += 10;
      (function(ii,dd){
          setTimeout(function(){
              element.css('backgroundColor','hsl('+h+',100%,'+ii+'%)'); 
          }, dd);    
      })(i,d);
    }
  };

  var updatePrices = () => {
    $.post("/api/updatePrices", (data) => {
      for(var i = 0; i < data.grimyHerbs.length; i++) {
        var grimyHerb = data.grimyHerbs[i];
        var cleanHerb = data.cleanHerbs[i];

        $("[id='"+grimyHerb['name']+"']").text(grimyHerb['price']+'gp');
        $("[id='"+cleanHerb['name']+"']").text(cleanHerb['price']+'gp');

        var prevProfit = parseInt($("[id='"+cleanHerb['name']+"profit']").text());

        var profit = cleanHerb['price']-grimyHerb['price'];
        var profitString = profit + 'gp';

        if (profit >= 0) {
          $("[id='"+cleanHerb['name']+"profit']").text(profitString).css('color', 'green');
        } else {
          $("[id='"+cleanHerb['name']+"profit']").text(profitString).css('color', 'red');
        }

        if (prevProfit < profit) {
          fadeColor($("[id='"+cleanHerb['name']+"col']"), 111);
        } else if (prevProfit > profit) {
          fadeColor($("[id='"+cleanHerb['name']+"col']"), 0);
        }
      }
    });

    setTimeout(updatePrices, 5000);
  };

  updatePrices();

});