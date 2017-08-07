var laberinto=document.getElementById('laberinto');

var mapa=[
"******************",
"*_________*______*",
"*_*****_____******",
"*______***__*__*_*",
"***_*____*____**_*",
"*___*____**__*___*",
"*_********__**_*_*",
"*____*______*__*_*",
"*_**_*__*****_**_*",
"*o*__*________**_*",
"****************W*"];


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
var flecha_izquierda='left';
var flecha_derecha='rigth';
var flecha_arriba='up';
var flecha_abajo='down';

function generarMapa(map, flecha) {
  laberinto.innerHTML='';
  var tabla = document.createElement('table');
  tabla.setAttribute('cellspacing','0');
  for (var i = 0; i < map.length; i++) {
    var fila = document.createElement('tr');
    for (var j = 0; j < map[i].length; j++) {
        var celda = document.createElement('td');
        if(map[i][j]=='*'){
          celda.setAttribute('class', 'muro');
        } else if(map[i][j]=='o'){
          x=j;
          y=i;
          f=flecha;
          celda.setAttribute('id',flecha);
        } else if (map[i][j]=='W') {
          xfinal=j;
          yfinal=i;
          celda.setAttribute('class', 'llegada');
        }
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  laberinto.appendChild(tabla);
  if(x==xfinal && y==yfinal){
    alert('ganaste');
  }
}

generarMapa(map, 'empezar');

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
