//Ejercicio: Deteccion de Palíndromos
//Objetivo: Crear una logica compleja encapsulada en una funcion
//un ejemplo de palindromo es "anilina" o "reconocer" oso
//1. Crea una funcion llamada esPalindromo que reciba un texto y retorne true si es un palindromo o false si no lo es
/**
 * Comprueba si una cadena es un palíndromo.
 *
 * Convierte la cadena a minúsculas y compara los caracteres desde los extremos hacia el centro.
 * Nota: esta implementación solo ignora las diferencias entre mayúsculas y minúsculas;
 * no elimina espacios ni signos de puntuación.
 *
 * @param {string} texto - Texto a evaluar como palíndromo.
 * @returns {boolean} Devuelve true si el texto es un palíndromo, false en caso contrario.
 *
 * @example
 * // Devuelve true (ignora mayúsculas)
 * esPalindromo('Ana'); // => true
 */
function esPalindromo(texto) {
    // Eliminamos espacios en blanco y convertimos a minúsculas
    var textoLimpio = texto.replace(/\s+/g, '').toLowerCase();
    
    // Obtenemos la longitud del texto limpio
    var longitud = textoLimpio.length;
    
    // Recorremos la mitad del texto comparando caracteres desde el inicio y el final
    for (var i = 0; i < longitud / 2; i++) {
        if (textoLimpio[i] !== textoLimpio[longitud - 1 - i]) {
            return false;
        }
    }
    
    return true;
}
