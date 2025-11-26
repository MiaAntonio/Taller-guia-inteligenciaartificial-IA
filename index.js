// Escribir un saludo al usuario en consola 
console.log("¡Hola, usuario! Bienvenido a nuestro programa.");

// Función simple que suma dos valores y devuelve el resultado.
// No usa sintaxis avanzada de ES6 — sólo `function` y `var`.
function sumar(a, b) {
  // Convertimos el primer parámetro a número usando Number().
  // Esto permite aceptar tanto números como cadenas que contengan dígitos, por ejemplo "3".
  var x = Number(a);

  // Convertimos el segundo parámetro a número.
  var y = Number(b);

  // Comprobamos si alguna conversión produjo NaN (Not-a-Number).
  // isNaN(x) es true cuando x no representa un número válido.
  if (isNaN(x) || isNaN(y)) {
    // Si alguno no es un número válido, lanzamos un error con un mensaje explicativo.
    // Lanzar un error detiene la ejecución a menos que se capture con try/catch.
    throw new Error('Ambos argumentos deben ser números o cadenas numéricas (p. ej. \"12\" o \"3.5\").');
  }

  // Si ambos son números válidos, devolvemos su suma.
  return x + y;
}

console.log(sumar(2, 3));       // 5      -> ambos son números
console.log(sumar('4', '5'));   // 9      -> cadenas convertibles a números
console.log(sumar('2', 3));     // 5      -> mezcla de cadena y número

// Manejo de errores con try/catch
try {
  console.log(sumar('hola', 2)); // lanzará un Error porque 'hola' no es número
} catch (e) {
  console.log('Error:', e.message);
}



