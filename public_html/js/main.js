jQuery(function(){

var pp = Raphael(document.getElementById('cvs'), 600, 600);
var out = pp.text(50, 300, "Raphaël");

// Les styles visuels en JSON pour Raphaël
var gat={ // grid attributes
  fill: "darkseagreen",
  stroke: "brown",
  "stroke-width": 2,
  "stroke-linejoin": "round"
};
var pat={ // pawn attributes
  stroke: "brown",
  "stroke-width": 0,
  "stroke-linejoin": "round"
};

var grd=5;      // Grid Size
var lm=10;      // cvs Left Margin
var tm=10;      // cvs Top Margin
var gsz=48;     // Grid Size
var psz=gsz/2;  // pawn size
var gbd={};     // GameBoarD collection
var pws={};     // Pawns collection
var spn=0;      // Index of selected pawn

for(var r=0; r<grd; r++){   // row
  for(var c=0; c<grd; c++){ // column
    gbd[(r*grd)+c] =  
      pp.rect((c*52)+lm, (r*52)+tm, gsz, gsz, 2)
        .attr(gat)
        .click(function(){
          this.attr({"stroke-width": 1});
        })
        .mouseover(function(){
          this.attr({"stroke-width": 3});
        })
        .mouseout(function(){
          this.attr({"stroke-width": 2});
        });
  }
}

for(var r=0; r<grd; r++){   // row
  for(var c=0; c<grd; c++){ // column
    var i=(r*grd)+c;
    pws[i]=  
      pp.circle((c*52)+300, (r*52)+34, psz, psz, 2)
        .attr(pat)
        .data("idx", i)
        .click(function(){
          this.attr({"stroke-width": 1});
          Output(this.data("idx"));
        })
        .mouseover(function(){
          this.attr({"stroke-width": 1});
        })
        .mouseout(function(){
          this.attr({"stroke-width": 0});
        });
    switch(r){
      case 0 :
        pws[i].attr({fill:"red"}); break;
      case 1 :
        pws[i].attr({fill:"purple"}); break;
      case 2 :
        pws[i].attr({fill:"black"}); break;
      case 3 :
        pws[i].attr({fill:"blue"}); break;
      case 4 :
        pws[i].attr({fill:"gold"}); break;
    };
  }
}

function Output(idx){
  out.attr({text: pws[idx].data("idx")});
}



// test pour modifier une propriété
// gbd[0].attr({"stroke-width": 1});
// pws[0].attr({cx:34});
// pws[0].attr({fill:"red"});
// test pour accrocher un évènement
/* gbd[0].click(function(){
  this.attr({"stroke-width": 1});
}); */

// test pour une boucle foreach
/* for(var el in gbd){
  gbd[el].attr({"stroke-width": 3});
}; */

});