// Ejercicio: COnsumo de APIs con Fetch
// Objetivo: Buscar un Pokemon con PokeAPI y mostrar su nombre en consola
//1. Crea una function llamado obtenerPokemoApi que reciba un nombre de pokemon, consulte la PokeAPI 
// y devuelva los datos en JSON e imprima en consola 
function obtenerPokemonApi(nombrePokemon) {
  // Devolvemos la promesa del fetch para que el llamador pueda manejar el resultado
  return fetch('https://pokeapi.co/api/v2/pokemon/' + nombrePokemon.toLowerCase())
    .then(function(response) {
      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error('Error al obtener el Pokémon: ' + response.status + ' ' + response.statusText);
      }
      // Convertimos la respuesta a JSON y la devolvemos
      return response.json();
    });
}

// 2. Llama a la funcion obtenerPokemonApi con el nombre de un pokemon (por ejemplo "pikachu") 
// Nota: ahora la función devuelve una promesa. Si quieres una llamada de ejemplo desde este archivo
// puedes descomentar el siguiente bloque. La mayoría de uso se hará desde el HTML que importe este script.

// ejemplo de uso (descomentar para probar desde aquí):
// obtenerPokemonApi('pikachu')
//   .then(function(data) { console.log('Nombre del Pokémon:', data.name); })
//   .catch(function(err) { console.error('Error:', err.message); });