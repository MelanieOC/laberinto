var laberinto=document.getElementById('laberinto');
var reiniciar = document.getElementById('reiniciar');
var seleccionar = document.getElementById('nivel');

var mapa1=[
"******************",
"*_________*______*",
"*__****_____******",
"*______***__*__*_*",
"***_*____*____**_*",
"*___*____**__*___*",
"*_********__**_*_*",
"*____*______*__*_*",
"*_**_*__*****_**_*",
"*o*___________**W*",
"******************"];

var mapa2=[
"******************",
"*_________*____*W*",
"*__****_____****_*",
"*______***__*__*_*",
"***_*____*____**_*",
"*___*____**__*___*",
"*_***_****__**_*_*",
"*____*______*__*_*",
"*_**_*__*****_**_*",
"*o____________*__*",
"******************"];

var mapa3=[
"*******************",
"*_____*___*_______*",
"*__****_____*****_*",
"*___*__***_____*__*",
"***_*____*____**__*",
"*___*____**__*____*",
"*_****__**__**_*__*",
"*____*______*__*__*",
"*_**_*__*****_***_*",
"*o*___________**W_*",
"*******************"];

var mapa=mapa1;

seleccionar.onchange=function() {
  var select=seleccionar.value;
  console.log(select);
  if(select=='1'){
    mapa=mapa1;
  } else if (select=='2') {
    mapa=mapa2;
  } else if(select=='3'){
    mapa=mapa3
  }
  iniciar();
  generarMapa(map, 'empezar');
}

var x;
var y;
var actual;
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
function iniciar(){
  for (var i = 0; i < mapa.length; i++){
      map[i]=[];
    for (var j = 0; j < mapa[0].length; j++) {
      map[i][j]=mapa[i][j];
    }
  }
}
iniciar();
generarMapa(map, 'empezar');

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
          actual=direccion;
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
    var div=document.createElement('div');
    div.setAttribute('class', 'ganador');
    var imagen = document.createElement('img');
    imagen.setAttribute('src','css/mordida.png');
    imagen.setAttribute('width', '215px')
    var p=document.createElement('p');
    var texto= document.createTextNode('Yum.. Que rico!');
    p.appendChild(texto);
    div.appendChild(imagen);
    div.appendChild(p);
    laberinto.replaceChild(div, laberinto.firstChild);
  }
}



function move(a, b, direccion)
{
  if(map[y+a][x+b]!='*' && actual==direccion){
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

function voltear(a, b, f){
  if(f=='arriba'&& f=='abajo'){
    return map[y+a][x+b]=='*'&&map[y+b][x+a]=='*';
  } else {
    return map[y+a][x+b]=='*'&&map[y-b][x+a]=='*';
  }
}

function check(a, b, flecha) {
  move(a,b,actual);
  if(voltear(a,b,actual)){
    move(a, b, flecha);
  }
}

var time;

var r = document.getElementById('resolver');
r.onclick=function () {
  time = setInterval(resolver, 400);
}

function resolver(){
  if(x==xfinal && y==yfinal){
    clearInterval(time);
  }
  switch (actual) {
    case arriba:
      check(-1, 0, derecha);
      if(map[y+1][x-1]=='*'&& map[y][x-1]!='*'){
        generarMapa(map,izquierda);
      }
    break;
    case derecha:
      check(0, 1, abajo);
      if(map[y-1][x-1]=='*'&& map[y-1][x]!='*'){
        generarMapa(map,arriba);
      }
    break;
    case izquierda:
      check(0, -1, arriba);
      if(map[y+1][x+1]=='*'&& map[y+1][x]!='*'){
        generarMapa(map,abajo);
      }
    break;
    case abajo:
      check(1, 0, izquierda);
      if(map[y-1][x+1]=='*'&& map[y][x+1]!='*'){
        generarMapa(map,derecha);
      }
    break;
    default:
      actual=arriba;
  }
};
