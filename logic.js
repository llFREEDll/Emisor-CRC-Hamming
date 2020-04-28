var caracter = document.getElementById('caracter');
var inputCrc = document.getElementById('CRC');
var radioPar = document.getElementById('par');
var radioImpar = document.getElementById('impar');
var writeAscii = document.getElementById('ascii');
var writeBinary = document.getElementById('binary');
var writeHamming = document.getElementById('hamming');
var writeCrc = document.getElementById('crc');

const Evaluate = () => {
  let aux = caracter.value;
  if(aux.length > 0){
    let aux = inputCrc.value;
    if(aux.length > 0){
      if(aux.charAt(0) == 1){
      if(radioPar.checked){
        var asc = caracter.value.charCodeAt(0);
        //writeAscii.innerHTML = writeAscii.textContent + asc;
        writeAscii.innerHTML = "El ASCII es: " + asc;
        asc = DecToBin(asc);
        asc = HammingPar(asc);
        MethodCrc(asc,inputCrc.value);

      }else if(radioImpar.checked){
        var asc = caracter.value.charCodeAt(0);
        writeAscii.innerHTML = "El ASCII es: " + asc;
        asc = DecToBin(asc);
        asc = HammingImpar(asc);
        MethodCrc(asc,inputCrc.value);

      }else alert("Selecciona par o impar");
    }else alert("Tu ecuacion CRC no existe");
  }else alert("Rellena la ecuacion CRC");
}else alert("Ingresa un caracter");

}
const MethodCrc = (cadena,polinomio) => {
  let aux = cadena;
  let resultado = "";
  for (var i = 0 ; i < polinomio.length - 1 ; i++)
    cadena = cadena + "0";
  while (polinomio.length <= cadena.length){
    var index = cadena.indexOf("1");
    resultado = "";
    for (var i = 0 ; i < polinomio.length ; i++) {
      let chCad = cadena.charAt(i + index);
      let chPoli = inputCrc.value.charAt(i);
      if(chCad == chPoli)
        resultado = resultado + "0";
      else
        resultado = resultado + "1";
    }
    cadena = cadena.substring(index + polinomio.length ,cadena.length);
    cadena = resultado + cadena;
    index = cadena.indexOf("1");
    if(index > -1)
    cadena = cadena.substring( index,cadena.length);
    else cadena = "";
    
  }
  cadena = cadena.substring(cadena.length - (polinomio.length - 1), cadena.length);
  while (cadena.length < polinomio.length - 1) {
    cadena = "0" + cadena;
  }
  writeCrc.innerHTML = "Con CRC: " + aux + cadena;

}
const HammingImpar = cadena =>{
  cadena = "xx" + cadena.substring(0,1) + "x" + cadena.substring(1,4) + "x" + cadena.substring(4,8);
  //iteracion 1
  let contarUnos = 0;
  for(var i = 2; i < 11; i +=  2)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if (contarUnos % 2 != 0)
    cadena = "0"+cadena.substring(1,12);
  else
    cadena = "1"+cadena.substring(1,12);
  // iteracion 2
  contarUnos = 0;
  if(cadena.charAt(2) == '1')
       contarUnos ++;
  if(cadena.charAt(5) == '1')
       contarUnos ++;
  if(cadena.charAt(6) == '1')
        contarUnos ++;
  if(cadena.charAt(9) == '1')
       contarUnos ++;
  if(cadena.charAt(10) == '1')
       contarUnos ++;
  if (contarUnos % 2 != 0)
    cadena = cadena.substring(0,1) + "0" + cadena.substring(2,12);
  else
    cadena = cadena.substring(0,1) + "1" + cadena.substring(2,12);
  // iteracion 3
  contarUnos = 0;
  for(var i = 3; i < 7; i ++)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if(cadena.charAt(11) == '1')
       contarUnos ++;
       if (contarUnos % 2 != 0)
         cadena = cadena.substring(0,3) + "0" + cadena.substring(4,12);
       else
         cadena = cadena.substring(0,3) + "1" + cadena.substring(4,12);

// iteracion 4
contarUnos = 0;
for(var i = 7; i < 12; i ++)
  if(cadena.charAt(i) == '1')
        contarUnos ++;

  if (contarUnos % 2 != 0)
    cadena = cadena.substring(0,7) + "0" + cadena.substring(8,12);
  else
    cadena = cadena.substring(0,7) + "1" + cadena.substring(8,12);
    writeHamming.innerHTML = "Con Hamming: " + cadena;
    return cadena;
}
const HammingPar = cadena =>{
  cadena = "xx" + cadena.substring(0,1) + "x" + cadena.substring(1,4) + "x" + cadena.substring(4,8);
  //iteracion 1
  let contarUnos = 0;
  for(var i = 2; i < 11; i +=  2)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if (contarUnos % 2 == 0)
    cadena = "0"+cadena.substring(1,12);
  else
    cadena = "1"+cadena.substring(1,12);
  // iteracion 2
  contarUnos = 0;
  if(cadena.charAt(2) == '1')
       contarUnos ++;
  if(cadena.charAt(5) == '1')
       contarUnos ++;
  if(cadena.charAt(6) == '1')
        contarUnos ++;
  if(cadena.charAt(9) == '1')
       contarUnos ++;
  if(cadena.charAt(10) == '1')
       contarUnos ++;
  if (contarUnos % 2 == 0)
    cadena = cadena.substring(0,1) + "0" + cadena.substring(2,12);
  else
    cadena = cadena.substring(0,1) + "1" + cadena.substring(2,12);
  // iteracion 3
  contarUnos = 0;
  for(var i = 3; i < 7; i ++)
     if(cadena.charAt(i) == '1')
          contarUnos ++;

  if(cadena.charAt(11) == '1')
       contarUnos ++;
       if (contarUnos % 2 == 0)
         cadena = cadena.substring(0,3) + "0" + cadena.substring(4,12);
       else
         cadena = cadena.substring(0,3) + "1" + cadena.substring(4,12);

// iteracion 4
contarUnos = 0;
for(var i = 7; i < 12; i ++)
  if(cadena.charAt(i) == '1')
        contarUnos ++;

  if (contarUnos % 2 == 0)
    cadena = cadena.substring(0,7) + "0" + cadena.substring(8,12);
  else
    cadena = cadena.substring(0,7) + "1" + cadena.substring(8,12);
    writeHamming.innerHTML = "Con Hamming: " + cadena;
    return cadena;
}
const DecToBin = number =>{
    var total="";
    var numberI=0;
    numberI=parseInt(number);
        if(numberI>0){
            while(numberI>0){
            total=parseInt(numberI%2)+total;
            numberI=parseInt(numberI/2);
        }
        while(total.length<8)
          total= "0"+total;
        writeBinary.innerHTML = "En binario es:" + total;
        return total;
        }
        else{
          writeBinary.innerHTML = "En binario es: 0";
          return total;
        }
}
