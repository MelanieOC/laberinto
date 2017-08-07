var laberinto=document.getElementById('laberinto');
var reiniciar = document.getElementById('reiniciar');

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
"*o*__*________**W*",
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
          celda.setAttribute('class', 'llegada');
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
  if(map[y+a][x+b]!='*'&&f==direccion){
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
}
function pegado(a,b, d) {
 if(d=='arriba'&& d=='abajo'){
    return map[y+b][x+a]=='*';
 } else{
    return map[y-b][x+a]=='*';
 }
}
function check(a, b, flecha1, flecha2) {
  if(map[y+a][x+b]!='*' && pegado(a,b,f)){
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
r.onclick=function resolver(){
  switch (f) {
    case arriba:
      check(-1, 0, derecha, izquierda);
    break;
    case derecha:
      check(0, 1, arriba, abajo);
    break;
    case izquierda:
      check(0, -1, abajo, arriba);
    break;
    case abajo:
      check(1, 0, izquierda, derecha);
    break;
    default:
      f=arriba;
  }
};

