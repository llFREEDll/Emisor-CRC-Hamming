# Emisor-CRC-Hamming
Emisor by method CRC and hamming 

# ¿Cómo funciona?

- Este formulario recibe tres valores

- El primero es un carácter que simula el envió de paquetes por una red, este será convertido a binario y a partir de aquí se realizan las operaciones necesarias para encriptar este dato

- El segundo valor recibe un polinomio en binario, mas conocido como una llave, con el cual se encripta el mensaje y este mismo se encarga de desencriptar.

- El tercer valor define la paridad si es par o impar, esto nos indica si los bits activos en la trama, los números “1”, que fueron enviados son pares o impares.

Asu ves este código puede ser verificado con el [Receptor CRC Hamming](https://llfreedll.github.io/Receptor-CRC-Hamming/).
