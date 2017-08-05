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
"*o*__*________**W*",
"******************"];


var tabla = document.createElement('table');
tabla.setAttribute('cellspacing','0');
for (var i = 0; i < mapa.length; i++) {
  var fila = document.createElement('tr');
  for (var j = 0; j < mapa[0].length; j++) {
      var celda = document.createElement('td');
      if(mapa[i][j]=='*'){
        celda.style.backgroundColor='black';
      } else if(mapa[i][j]=='o'){
        celda.style.backgroundColor='blue';
      } else if (mapa[i][j]=='W') {
        celda.style.backgroundColor='red';
      }
      fila.appendChild(celda);
  }
  tabla.appendChild(fila);
}

laberinto.appendChild(tabla);
