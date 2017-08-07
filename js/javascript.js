var laberinto=document.getElementById('laberinto');
var reiniciar = document.getElementById('reiniciar');

var mapa=[
"******************",
"*_________*______*",
"*_*****_*___******",
"*_______**__*__*_*",
"***_*_____*___**_*",
"*___*____**__*___*",
"*_********__**_*_*",
"*__*_*______*__*_*",
"*__*_*__*****_**_*",
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
var izquierda='left';
var derecha='rigth';
var arriba='up';
var abajo='down';

function generarMapa(mapa, direccion) {
  laberinto.innerHTML='';
  var tabla = document.createElement('table');
  tabla.setAttribute('cellspacing','0');
  tabla.setAttribute('id','mapa');
  for (var i = 0; i < mapa.length; i++) {
    var fila = document.createElement('tr');
    for (var j = 0; j < mapa[i].length; j++) {
        var celda = document.createElement('td');
        if(mapa[i][j]=='*'){
          celda.setAttribute('class', 'muro');
        } else if(mapa[i][j]=='o'){
          x=j;
          y=i;
          f=direccion;
          celda.setAttribute('id',direccion);
        } else if (mapa[i][j]=='W') {
          xfinal=j;
          yfinal=i;
          celda.setAttribute('id', 'llegada');
        }
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  laberinto.appendChild(tabla);
  if(x==xfinal && y==yfinal){
    var imagen = document.createElement('img');
    imagen.setAttribute('src','css/manzana.jpg');
    laberinto.replaceChild(imagen, laberinto.firstChild);
    var p=document.createElement('p');
    var texto= document.createTextNode('Yum.. Que rico!');
    p.appendChild(texto);
    laberinto.appendChild(p);
  }
}

generarMapa(map, 'empezar');


function move(a, b, direccion) {
  if(map[y+a][x+b]!='*' &&f==direccion){
    map[y][x]='x';
    map[y+a][x+b]='o';
  }
  generarMapa(map, direccion);
}

function movimiento(evento)
{
  switch(evento.keyCode)
  {
    case teclas.UP:
      move(-1, 0, arriba);
    break;
    case teclas.DOWN:
      move(1, 0, abajo);
    break;
    case teclas.LEFT:
      move(0, -1, izquierda);
    break;
    case teclas.RIGHT:
      move(0, 1, derecha);
    break;
  }
}

reiniciar.onclick=function() {
  map[y][x]='_';
  map[9][1]='o';
  generarMapa(map, 'empezar');
  clearInterval(time);
}

function pegado(a, b, f) {
  if(f=='arriba'&& f=='abajo'){
    return map[y+b][x+a]=='*';
  } else {
    return map[y-b][x+a]=='*';
  }
}
function voltear(a, b){
  if(f=='arriba'&& f=='abajo'){
    return map[y+a][x]=='*'&&map[y][x+a]=='*';
  } else {
    return map[y-b][x]=='*'&& map[y][x+b]=='*';
  }
}
function check(a, b, flecha1, flecha2) {
  if(map[y+a][x+b]!='*' && pegado(a, b, f)){
    move(a, b, f);
  } 
}

var time;

var r = document.getElementById('resolver');
r.onclick=function () {
  time = setInterval(resolver, 300);
}

function resolver(){
  if(x==xfinal && y==yfinal){
    clearInterval(time);
  }
  switch (f) {
    case arriba:
      check(-1, 0, derecha, izquierda);
      if(map[y-1][x]=='*'&&map[y][x-1]=='*'){
        f=derecha;
        generarMapa(map,f);
      }
      if(map[y+1][x-1]=='*'&& map[y][x-1]!='*'){
        f=izquierda;
        generarMapa(map,f);
        move(0, -1, izquierda);
      }
    break;
    case derecha:
      check(0, 1, arriba, abajo);
      if(map[y-1][x]=='*'&& map[y][x+1]=='*'){
        f=abajo;
        generarMapa(map,f);
      }
      if(map[y-1][x-1]=='*'&& map[y-1][x]!='*'){
        f=arriba;
        generarMapa(map,f);
        move(-1, 0, arriba);
      }
    break;
    case izquierda:
      check(0, -1, abajo, arriba);
      if(map[y+1][x]=='*'&&map[y][x-1]=='*'){
        f=arriba;
        generarMapa(map,f);
      }
      if(map[y+1][x+1]=='*'&& map[y+1][x]!='*'){
        f=abajo;
        generarMapa(map,f);
        move(1, 0, abajo);
      }
    break;
    case abajo:
      check(1, 0, izquierda, derecha);
      if(map[y+1][x]=='*'&&map[y][x+1]=='*'){
        f=izquierda;
        generarMapa(map,f);
      }
      if(map[y-1][x+1]=='*'&& map[y][x+1]!='*'){
        f=derecha;
        generarMapa(map,f);
        move(0, 1, derecha);
      }
    break;
    default:
      f=arriba;
  }
};

/*function () {
  time = setInterval(resolver, 300);
}
function resolver(){
  if(x==xfinal && y==yfinal){
    clearInterval(time);
  }
  
*/
