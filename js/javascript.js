var laberinto=document.getElementById('laberinto');
var reiniciar = document.getElementById('reiniciar');
var seleccionar = document.getElementById('nivel');
var solucion = document.getElementById('resolver');

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

//variables globales
var x;//se almacena posicion del personaje
var y;
var actual;//se indica en que direccion está el personaje
var xfinal;
var yfinal;
var time;


//keycode de las teclas
var teclas = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

//evento 
document.addEventListener("keydown", movimiento);


//construccion del mapa
var map = [];
function iniciar(){
  for (var i = 0; i < mapa.length; i++){
    map[i]=[];
    for (var j = 0; j < mapa[0].length; j++) {
      map[i][j]=mapa[i][j];
    }
  }
}

//variables constantes
const izquierda='left';
const derecha='rigth';
const arriba='up';
const abajo='down';

//funcion que genera el mapa en html
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
          x=j;//se fija la posicion en donde está el personaje
          y=i;
          actual=direccion;//se fija direccion
          celda.setAttribute('id',direccion);
        } else if (mapa[i][j]=='W') {
          xfinal=j;//se fija la posicion inicial
          yfinal=i;
          celda.setAttribute('id', 'llegada');
        }
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  laberinto.appendChild(tabla);
  if(x==xfinal && y==yfinal){ //si el personaje llega al punto final, gana
    ganar();
  }
}

iniciar();
generarMapa(map, 'empezar');//se genera el mapa inicial


function ganar(){ //funcion que genera el formato cuando gana
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

function move(a, b, direccion) //funcion que genera movimiento
{
  if(map[y+a][x+b]!='*' && actual==direccion){//si no hay un 'muro' adelante
    map[y][x]='x';
    map[y+a][x+b]='o';
  }
  generarMapa(map, direccion);//se renderiza
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

function chocar(a, b, direccion){
  if(direccion=='arriba'&& direccion=='abajo'){
    return map[y+a][x+b]=='*'&&map[y+b][x+a]=='*';//si al frente hay pared y sigo pegado al muro
  } else {
    return map[y+a][x+b]=='*'&&map[y-b][x+a]=='*';
  }
}

function check(a, b, direccion) {
  move(a,b,actual); //se mueve en direccion actual
  if(chocar(a,b,actual)){ //si choca
    move(a, b, direccion); //se mueve a direccion indicada
  }
}

function resolver(){
  if(x==xfinal && y==yfinal){
    clearInterval(time);
  }
  switch (actual) { //evalua segun en que direccion está el personaje
    case arriba:
      check(-1, 0, derecha);
      if(map[y+1][x-1]=='*'&& map[y][x-1]!='*'){//si al costado no hay pared y a la diagonal izquierda hay muro
        generarMapa(map,izquierda);//gira a direccion indicada
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


solucion.onclick=function () {
  time = setInterval(resolver, 400);
}



reiniciar.onclick=function() { //funcion reiniciar
  map[y][x]='_';
  map[9][1]='o';
  map[yfinal][xfinal]='W';
  generarMapa(map, 'empezar');
  clearInterval(time);
}