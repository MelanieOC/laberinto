var laberinto=document.getElementById('laberinto');

var mapa=[
"******************",
"*_________*______*",
"*__****____******",
"*______***__*__*_*",
"***_*____*____**_*",
"*___*____**__*___*",
"*_********__**_*_*",
"*____*______*__*_*",
"*_**_*__*****_**_*",
"*o*___________**W*",
"******************"];

var x;
var y;
var f;
var xfinal;
var yfinal;

var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};
document.addEventListener("keydown", movimiento);

var map = [];
for (var i = 0; i < mapa.length; i++){
  map[i]=[];
  for (var j = 0; j < mapa[0].length; j++) {
    map[i][j]=mapa[i][j];
  }
}
var flecha_izquierda=document.createTextNode('←');
var flecha_derecha=document.createTextNode('→');
var flecha_arriba=document.createTextNode('↑');
var flecha_abajo=document.createTextNode('↓');

function generarMapa(map, flecha) {
  laberinto.innerHTML='';
  var tabla = document.createElement('table');
  tabla.setAttribute('cellspacing','0');
  for (var i = 0; i < map.length; i++) {
    var fila = document.createElement('tr');
    for (var j = 0; j < map[i].length; j++) {
        var celda = document.createElement('td');
        if(map[i][j]=='*'){
          celda.style.backgroundColor='black';
        } else if(map[i][j]=='o'){
          x=j;
          y=i;
          f=flecha;
          celda.appendChild(flecha);
        } else if (map[i][j]=='W') {
          xfinal=j;
          yfinal=i;
          celda.style.backgroundColor='red';
        }
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  laberinto.appendChild(tabla);
  if(ganaste()){
    alert('ganaste');
  }
}

function ganaste() {
  return x==xfinal && y==yfinal;
}

generarMapa(map, flecha_arriba);

function move(a, b, flecha) {
  if(map[y+a][x+b]!='*'&&f==flecha){
    map[y][x]='_';
    y=y+a;
    x=x+b;
    map[y][x]='o';
  }
  generarMapa(map, flecha);
}

function movimiento(evento)
{
  switch(evento.keyCode)
  {
    case teclas.UP:
      move(-1, 0, flecha_arriba);
    break;
    case teclas.DOWN:
      move(1, 0, flecha_abajo);
    break;
    case teclas.LEFT:
      move(0, -1, flecha_izquierda);
    break;
    case teclas.RIGHT:
      move(0, 1, flecha_derecha);
    break;
  }
}

function check(a, b, flecha1, flecha2) {
  if(map[y+a][x+b]!='*'){
    move(a, b, f);
  } else if (map[y+b][x+a]=='*'&& map[y+a][x+b]=='*') {
    f=flecha1;
    generarMapa(map,f);
  } else {
    f=flecha2;
    generarMapa(map,f);
  }
}

var r = document.getElementById('resolver');
r.onclick=function(){
  switch (f) {
    case flecha_arriba:
      check(-1, 0, flecha_derecha, flecha_izquierda);
    break;
    case flecha_derecha:
      check(0, 1, flecha_arriba, flecha_abajo);
    break;
    case flecha_izquierda:
      check(0, -1, flecha_abajo, flecha_arriba);
    break;
    case flecha_abajo:
      check(1, 0, flecha_izquierda, flecha_derecha);
    break;
    default:
  }
};
