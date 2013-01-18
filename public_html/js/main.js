jQuery(function(){

var paper = Raphael(document.getElementById('cvs'), 600, 600);
var out = paper.text(50, 300, "Raphaël");

// Les styles visuels en JSON pour Raphaël
var gat={ // grid attributes
  "fill": "darkseagreen",
  "stroke": "brown",
  "stroke-width": 2,
  "stroke-linejoin": "round"
};
// pawn attributes
var pat={"stroke": "brown","stroke-width": 0};
var sw0={"stroke-width": 0};
var sw3={"stroke-width": 3};
// colors
var fRed={fill:"red"};

var grd=5;      // Grid Size
var lm=10;      // cvs Left Margin
var tm=10;      // cvs Top Margin
var gsz=48;     // Grid Size
var psz=gsz/2;  // pawn size
var gbd={};     // GameBoard collection de cellule (cel)
var pws={};     // Pawns collection de pawn (pwn)
var spn=-1;     // Index of selected pawn
var cel=-1;     // Index of Clicked cel of gameBoard

initBoard();

function initBoard(){ 
  for(var r=0; r<grd; r++){   // row
    for(var c=0; c<grd; c++){ // column
      var i=(r*grd)+c;
      gbd[i]=
        paper.rect((c*52)+lm, (r*52)+tm, gsz, gsz, 2)
          .attr(gat)
          .data('i',i)
          .data('s',false) // flag selectable ?
          .data('c',"empty")
          .click(function(){
            // this.attr({"stroke-width": 1});
            checkBoard(this);
          })
          .mouseover(function(){
            this.attr({"stroke-width": 3});
          })
          .mouseout(function(){
            this.attr({"stroke-width": 2});
          });
    };
  };

  for(var r=0; r<grd; r++){   // row
    for(var c=0; c<grd; c++){ // column
      var i=(r*grd)+c;
      pws[i]=paper.circle((c*52)+300, (r*52)+34, psz, psz, 2)
        .attr(pat)
        .data('i',i)
        .data('s',false) // flag selectable ?
        .click(function(){selPawn(this);});
      switch(r){
        case 0 : pws[i].attr({"fill":"red"}); break;
        case 1 : pws[i].attr({"fill":"purple"}); break;
        case 2 : pws[i].attr({"fill":"black"}); break;
        case 3 : pws[i].attr({"fill":"blue"}); break;
        case 4 : pws[i].attr({"fill":"gold"}); break;
      };
    };
  };
};

function selPawn(pwn){
  switch (pwn.data('s')){
    case false : 
      unselPws(); 
      pwn.attr(sw3); 
      spn=pwn.data('i');
      out.attr({text:spn});
      break;
  };
};

function checkBoard(obj){
  switch (obj.data('s')){
    case false :
      obj.data('s',true);
      unselPws();
      cel=obj.data('i');
      if(spn>-1){
        pws[spn].animate({cx:obj.attr('x')+psz,cy:obj.attr('y')+psz},300,"bounce").data('s',true);
        obj.data('c',pws[spn].attr("fill"));
        spn=-1;
      };
      break;
  };
  switch(cel){
    case 0 :
      out.attr({text:gbd[cel].data('c')}); // debug
    case 1 :
  };
  
};

function unselPws(){
  for (var k in pws){
    pws[k].attr(sw0);
  };
};

// to do list
// -> 

});

