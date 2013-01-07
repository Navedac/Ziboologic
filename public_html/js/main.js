jQuery(function(){

var paper = new Raphael(document.getElementById('cvs'), 600, 600);

// Les styles visuels en JSON
var attr = {
  fill: "#f5f5f5",
  stroke: "#d5d5d5",
  "stroke-width": 1,
  "stroke-linejoin": "round"
};
  
var els = {};


for (var i = 0; i < 9; i++){
  els[i] = paper.rect(((i)* 60)+10, 40, 50, 50, 10).attr(attr);
}
  
var current = null;
for (var el in els) {
  els[el].color = "#0493AB";
    (function (st, el) {
        st[0].style.cursor = "pointer";
        st[0].onmouseover = function () {
            current && els[current].animate({fill: "#f5f5f5", stroke: "#d5d5d5"}, 300);
            st.animate({fill: st.color, stroke: "#d5d5d5"}, 300);
            paper.safari();
        };
        st[0].onmouseout = function () {
            st.animate({fill: "#f5f5f5", stroke: "#d5d5d5"}, 300);
            paper.safari();
        };
    })(els[el], el);
  }
});



