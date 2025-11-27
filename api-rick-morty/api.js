// API de Rick and Morty - Consumo sin frameworks
// URL base de la API
var API_URL = 'https://rickandmortyapi.com/api/character';

// Referencias a elementos del DOM
var searchInput = document.getElementById('searchinput');
var searchBtn = document.getElementById('searchBtn');
var container = document.getElementById('container');

/**
 * Obtiene personajes de la API de Rick and Morty
 * @param {string} name - Nombre del personaje a buscar (opcional)
 * @returns {Promise} Promesa con los datos de personajes
 */
function fetchCharacters(name) {
  var url = API_URL;
  if (name) {
    url += '?name=' + encodeURIComponent(name);
  }

  return fetch(url)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error ' + response.status + ': No se encontraron personajes');
      }
      return response.json();
    });
}

/**
 * Obtiene el color del badge según el estado
 * @param {string} status - Estado del personaje (Alive, Dead, unknown)
 * @returns {string} Clase CSS del badge
 */
function getStatusClass(status) {
  if (status === 'Alive') return 'status-alive';
  if (status === 'Dead') return 'status-dead';
  return 'status-unknown';
}

/**
 * Renderiza una tarjeta de personaje
 * @param {object} character - Objeto del personaje
 * @returns {HTMLElement} Elemento de la tarjeta
 */
function createCharacterCard(character) {
  var card = document.createElement('div');
  card.className = 'character-card';

  var statusClass = getStatusClass(character.status);

  card.innerHTML = '\
    <img src="' + character.image + '" alt="' + character.name + '" />\
    <div class="card-content">\
      <h2>' + character.name + '</h2>\
      <div class="status-badge ' + statusClass + '">' + character.status + '</div>\
      <div class="card-detail"><strong>Especie:</strong> ' + character.species + '</div>\
      <div class="card-detail"><strong>Ubicación:</strong> ' + character.location.name + '</div>\
    </div>\
  ';

  return card;
}

/**
 * Renderiza los resultados en el contenedor
 * @param {array} characters - Lista de personajes
 */
function renderCharacters(characters) {
  container.innerHTML = '';

  if (!characters || characters.length === 0) {
    container.innerHTML = '<div class="no-results">No se encontraron personajes. Intenta con otro nombre.</div>';
    return;
  }

  characters.forEach(function(character) {
    var card = createCharacterCard(character);
    container.appendChild(card);
  });
}

/**
 * Maneja la búsqueda de personajes
 */
function handleSearch() {
  var searchTerm = searchInput.value.trim();

  // Limpiar resultados y mostrar indicador de carga
  container.innerHTML = '<div class="loading">Buscando personajes...</div>';

  fetchCharacters(searchTerm)
    .then(function(data) {
      // Si data.results es un array, usarlo; si no, mostrar error
      if (data.results && Array.isArray(data.results)) {
        renderCharacters(data.results);
      } else {
        container.innerHTML = '<div class="error">Error al procesar los datos.</div>';
      }
    })
    .catch(function(error) {
      container.innerHTML = '<div class="error">Error: ' + error.message + '</div>';
    });
}

/**
 * Evento para el botón de búsqueda
 */
searchBtn.addEventListener('click', handleSearch);

/**
 * Evento para buscar al presionar Enter
 */
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

/**
 * Carga inicial de personajes (primeros 20)
 */
window.addEventListener('load', function() {
  handleSearch();
});
