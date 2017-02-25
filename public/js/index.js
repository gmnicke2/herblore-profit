$(document).ready(() => {
  
  var updatePrices = () => {
    $.post("/api/updatePrices", (data) => {
      for(var i = 0; i < data.grimyHerbs.length; i++) {
        var grimyHerb = data.grimyHerbs[i];
        var cleanHerb = data.cleanHerbs[i];

        $("[id='"+grimyHerb['name']+"']").text(grimyHerb['price']+'gp');
        $("[id='"+cleanHerb['name']+"']").text(cleanHerb['price']+'gp');

        var profit = cleanHerb['price']-grimyHerb['price'];
        if (profit >= 0) {
          $("[id='"+cleanHerb['name']+"profit']").text(profit + 'gp').css('color', 'green');
        } else {
          $("[id='"+cleanHerb['name']+"profit']").text(profit + 'gp').css('color', 'red');
        }
      }
    });

    setTimeout(updatePrices, 10000);
  };

  updatePrices();

});