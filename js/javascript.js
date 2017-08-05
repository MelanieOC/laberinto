var laberinto=document.getElementById('laberinto');
var izquierda = document.getElementById('izquierda');
var derecha = document.getElementById('derecha');
var forward = document.getElementById('forward');
var abajo = document.getElementById('abajo');
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

var map = [];
for (var i = 0; i < mapa.length; i++){
  map[i]=[];
  for (var j = 0; j < mapa[0].length; j++) {
    map[i][j]=mapa[i][j];
  }
}

function generarMapa(map) {
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
          celda.style.backgroundColor='blue';
        } else if (map[i][j]=='W') {
          celda.style.backgroundColor='red';
        }
        fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  laberinto.appendChild(tabla);
}

generarMapa(map);


forward.onclick=function() {
  if(map[y-1][x]!='*'){
    map[y][x]='_';
    y-=1;
    map[y][x]='o';
    generarMapa(map);
  }
}

derecha.onclick=function() {
  if(map[y][x+1]!='*'){
    map[y][x]='_';
    x+=1;
    map[y][x]='o';
    generarMapa(map);
  }
}

izquierda.onclick=function() {
  if(map[y][x-1]!='*'){
    map[y][x]='_';
    x-=1;
    map[y][x]='o';
    generarMapa(map);
  }
}

abajo.onclick=function() {
  if(map[y+1][x]!='*'){
    map[y][x]='_';
    y+=1;
    map[y][x]='o';
    generarMapa(map);
  }
}
