jQuery(function(){

var pp = new Raphael(document.getElementById('cvs'), 600, 600);

// Les styles visuels en JSON pour Raphaël
var att = {
  fill: "#f5f5f5",
  stroke: "#d5d5d5",
  "stroke-width": 1,
  "stroke-linejoin": "round"
};

var grd=5;  // Grid Size 
var els={}; // Object collection

for(var r=0; r<grd; r++){ // row
  for(var c=0; c<grd; c++){ // column
    els[(r*grd)+c] =  
      pp.rect((c*60)+10, (r*60)+10, 50, 50, 10)
        .attr(att)
        .click(function(){
          this.attr({"stroke-width": 1});
        })
        .mouseover(function(){
          this.attr({"stroke-width": 5});
        })
        .mouseout(function(){
          this.attr({"stroke-width": 3});
        });
  }
}

// test pour modifier une propriété
els[0].attr({"stroke-width": 5});
// test pour accrocher un évènement
els[0].click(function(){
  this.attr({"stroke-width": 1});
});

// test pour une boucle foreach
for(var el in els){
  els[el].attr({"stroke-width": 3});
};

});