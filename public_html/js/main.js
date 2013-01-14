jQuery(function(){

var pp = Raphael(document.getElementById('cvs'), 600, 600);

// Les styles visuels en JSON pour Raphaël
var att = {
  fill: "darkseagreen",
  stroke: "#d5d5d5",
  "stroke-width": 2,
  "stroke-linejoin": "round"
};

var grd=5;  // Grid Size
var lm=10;  // Left Margin
var tm=10;  // Top Margin
var gsz=48; // Grid Size
var psz=gsz/2; // pwan size
var gbd={}; // GameBoarD collection
var pws={}; // Pawns collection

for(var r=0; r<grd; r++){ // row
  for(var c=0; c<grd; c++){ // column
    gbd[(r*grd)+c] =  
      pp.rect((c*52)+lm, (r*52)+tm, gsz, gsz, 2)
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

for(var r=0; r<grd; r++){ // row
  for(var c=0; c<grd; c++){ // column
    pws[(r*grd)+c] =  
      pp.circle((c*52)+300, (r*52)+34, psz, psz, 2)
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
gbd[0].attr({"stroke-width": 1});
pws[0].attr({cx:34});
// test pour accrocher un évènement
/* gbd[0].click(function(){
  this.attr({"stroke-width": 1});
}); */

// test pour une boucle foreach
/* for(var el in gbd){
  gbd[el].attr({"stroke-width": 3});
}; */

});