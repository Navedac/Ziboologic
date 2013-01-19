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

var gameLoss=false; // Flag

drawBoard();
drawPawns();


function drawBoard(){
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
};

function drawPawns(){
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
  rowCheck(cel); 
  colCheck(cel);
  diaCheck(cel);
  // check du flag gameLoss
  if (gameLoss){
    out.attr({text:'perdu'});
  }else{
    for (var k in gbd){
      //gbd[k].attr(sw0);
    };
  };
  
};

function rowCheck(index){
  var c=(gbd[index].data('c'));
  switch(index){
    case 0: case 5: case 10: case 15: case 20:     
      if(c===gbd[index+1].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+2].data('c')){gameLoss=true;break;};
      if(c===gbd[index+3].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+4].data('c')){gameLoss=true;break;}; 
      break;
    case 1: case 6: case 11: case 16: case 21:
      if(c===gbd[index-1].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+1].data('c')){gameLoss=true;break;};
      if(c===gbd[index+2].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+3].data('c')){gameLoss=true;break;};
      break;
    case 2: case 7: case 12: case 17: case 22:
      if(c===gbd[index-2].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-1].data('c')){gameLoss=true;break;};
      if(c===gbd[index+1].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+2].data('c')){gameLoss=true;break;};
      break;
    case 3: case 8: case 13: case 18: case 23:
      if(c===gbd[index-3].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-2].data('c')){gameLoss=true;break;};
      if(c===gbd[index-1].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+1].data('c')){gameLoss=true;break;};
      break;
    case 4: case 9: case 14: case 19: case 24:
      if(c===gbd[index-4].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-3].data('c')){gameLoss=true;break;};
      if(c===gbd[index-2].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-1].data('c')){gameLoss=true;break;};
      break;      
  };
};

function colCheck(index){
  var c=(gbd[index].data('c'));
  switch(index){
    case 0: case 1: case 2: case 3: case 4:     
      if(c===gbd[index+5].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+10].data('c')){gameLoss=true;break;};
      if(c===gbd[index+15].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+20].data('c')){gameLoss=true;break;}; 
      break;
    case 5: case 6: case 7: case 8: case 9:     
      if(c===gbd[index-5].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+5].data('c')){gameLoss=true;break;};
      if(c===gbd[index+10].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+15].data('c')){gameLoss=true;break;}; 
      break;
    case 10: case 11: case 12: case 13: case 14:     
      if(c===gbd[index-10].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-5].data('c')){gameLoss=true;break;};
      if(c===gbd[index+5].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+10].data('c')){gameLoss=true;break;}; 
      break;
    case 15: case 16: case 17: case 18: case 19:     
      if(c===gbd[index-15].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-10].data('c')){gameLoss=true;break;};
      if(c===gbd[index-5].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index+5].data('c')){gameLoss=true;break;}; 
      break;
    case 20: case 21: case 22: case 23: case 24:     
      if(c===gbd[index-20].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-15].data('c')){gameLoss=true;break;};
      if(c===gbd[index-10].data('c')){gameLoss=true;break;}; 
      if(c===gbd[index-5].data('c')){gameLoss=true;break;}; 
      break;    
  };
  
};

function diaCheck(index){
  var c=(gbd[index].data('c'));
  switch(index){
    case 0 :
      if(c===gbd[6].data('c')){gameLoss=true;break;}; 
      if(c===gbd[12].data('c')){gameLoss=true;break;};
      if(c===gbd[18].data('c')){gameLoss=true;break;}; 
      if(c===gbd[24].data('c')){gameLoss=true;break;}; 
      break;
    case 6 :
      if(c===gbd[0].data('c')){gameLoss=true;break;}; 
      if(c===gbd[12].data('c')){gameLoss=true;break;};
      if(c===gbd[18].data('c')){gameLoss=true;break;}; 
      if(c===gbd[24].data('c')){gameLoss=true;break;}; 
      break;
    case 12 :
      if(c===gbd[0].data('c')){gameLoss=true;break;}; 
      if(c===gbd[6].data('c')){gameLoss=true;break;};
      if(c===gbd[18].data('c')){gameLoss=true;break;}; 
      if(c===gbd[24].data('c')){gameLoss=true;break;};
      if(c===gbd[4].data('c')){gameLoss=true;break;}; 
      if(c===gbd[8].data('c')){gameLoss=true;break;};
      if(c===gbd[16].data('c')){gameLoss=true;break;}; 
      if(c===gbd[20].data('c')){gameLoss=true;break;}; 
      break;
    case 18 :
      if(c===gbd[0].data('c')){gameLoss=true;break;}; 
      if(c===gbd[6].data('c')){gameLoss=true;break;};
      if(c===gbd[12].data('c')){gameLoss=true;break;}; 
      if(c===gbd[24].data('c')){gameLoss=true;break;}; 
      break;
    case 24 :
      if(c===gbd[0].data('c')){gameLoss=true;break;}; 
      if(c===gbd[6].data('c')){gameLoss=true;break;};
      if(c===gbd[12].data('c')){gameLoss=true;break;}; 
      if(c===gbd[18].data('c')){gameLoss=true;break;}; 
      break;
    case 4 :
      if(c===gbd[8].data('c')){gameLoss=true;break;}; 
      if(c===gbd[12].data('c')){gameLoss=true;break;};
      if(c===gbd[16].data('c')){gameLoss=true;break;}; 
      if(c===gbd[20].data('c')){gameLoss=true;break;}; 
      break;
    case 8 :
      if(c===gbd[4].data('c')){gameLoss=true;break;}; 
      if(c===gbd[12].data('c')){gameLoss=true;break;};
      if(c===gbd[16].data('c')){gameLoss=true;break;}; 
      if(c===gbd[20].data('c')){gameLoss=true;break;}; 
      break;
    case 16 :
      if(c===gbd[4].data('c')){gameLoss=true;break;}; 
      if(c===gbd[8].data('c')){gameLoss=true;break;};
      if(c===gbd[12].data('c')){gameLoss=true;break;}; 
      if(c===gbd[20].data('c')){gameLoss=true;break;}; 
      break;
    case 20 :
      if(c===gbd[4].data('c')){gameLoss=true;break;}; 
      if(c===gbd[8].data('c')){gameLoss=true;break;};
      if(c===gbd[12].data('c')){gameLoss=true;break;}; 
      if(c===gbd[16].data('c')){gameLoss=true;break;}; 
      break;  
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

