// API de Cat Facts y Cat Images - Consumo sin frameworks
// URLs de las APIs
var CAT_FACT_API = 'https://catfact.ninja/fact';
var CAT_IMAGE_API = 'https://api.thecatapi.com/v1/images/search?limit=1';

// Referencias a elementos del DOM
var startBtn = document.getElementById('startBtn');
var retryBtn = document.getElementById('retryBtn');
var catCard = document.getElementById('catCard');
var catImage = document.getElementById('catImage');
var factText = document.getElementById('factText');
var factLength = document.getElementById('factLength');
var loading = document.getElementById('loading');
var errorDiv = document.getElementById('error');

// Contador de datos obtenidos (para la UI)
var factCount = 0;

/**
 * Obtiene un dato curioso sobre gatos de la API
 * @returns {Promise} Promesa con el dato curioso en español
 */
function fetchCatFact() {
  // Primero intentamos obtener en español directamente
  return fetch(CAT_FACT_API + '?max_length=200')
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error al obtener el dato: ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      // Intentar traducir el dato al español usando Google Translate API (sin key)
      // Si falla, devolver con aviso
      return translateToSpanish(data.fact)
        .then(function(translated) {
          return { fact: translated };
        })
        .catch(function() {
          // Si falla la traducción, devolver el original con nota
          return data;
        });
    });
}

/**
 * Traduce texto al español usando MyMemory Translation API (gratuita)
 * @param {string} text - Texto a traducir
 * @returns {Promise} Promesa con el texto traducido
 */
function translateToSpanish(text) {
  var encodedText = encodeURIComponent(text);
  return fetch('https://api.mymemory.translated.net/get?q=' + encodedText + '&langpair=en|es')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.responseStatus === 200 && data.responseData.translatedText) {
        return data.responseData.translatedText;
      }
      throw new Error('No se pudo traducir');
    });
}

/**
 * Obtiene una imagen aleatoria de un gato
 * @returns {Promise} Promesa con la URL de la imagen
 */
function fetchCatImage() {
  return fetch(CAT_IMAGE_API)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Error al obtener la imagen: ' + response.statusText);
      }
      return response.json();
    })
    .then(function(data) {
      if (data && data.length > 0) {
        return data[0].url;
      }
      // Si falla, retornar un placeholder
      return 'https://placekitten.com/400/300?image=' + Math.floor(Math.random() * 16);
    });
}

/**
 * Obtiene tanto el dato curioso como la imagen
 * @returns {Promise} Promesa con ambos datos
 */
function fetchCatData() {
  return Promise.all([fetchCatFact(), fetchCatImage()])
    .then(function(results) {
      var fact = results[0];
      // Asegurarse de que tenemos la propiedad 'fact'
      var factText = (fact && fact.fact) ? fact.fact : 'Dato no disponible';
      return {
        fact: factText,
        image: results[1]
      };
    });
}

/**
 * Renderiza la tarjeta con el dato curioso
 * @param {object} data - Objeto con fact e image
 */
function renderCatCard(data) {
  factText.textContent = data.fact;
  catImage.src = data.image;
  catImage.alt = 'Gato relacionado con: ' + data.fact.substring(0, 30) + '...';
  
  // Actualizar información
  var length = data.fact.length;
  factLength.textContent = length + ' caracteres';
  
  factCount++;
  document.getElementById('factCount').textContent = factCount + '/∞';
  
  // Mostrar tarjeta y ocultar botón inicial
  catCard.classList.add('show');
  startBtn.style.display = 'none';
  retryBtn.style.display = 'inline-block';
  
  // Ocultar loading y error
  loading.style.display = 'none';
  errorDiv.style.display = 'none';
}

/**
 * Muestra un mensaje de error
 * @param {string} message - Mensaje de error
 */
function showError(message) {
  errorDiv.textContent = 'Error: ' + message + ' Intenta de nuevo más tarde.';
  errorDiv.style.display = 'block';
  loading.style.display = 'none';
  startBtn.style.display = 'inline-block';
  retryBtn.style.display = 'none';
  catCard.classList.remove('show');
}

/**
 * Maneja la obtención del dato curioso
 */
function handleGetFact() {
  loading.style.display = 'block';
  errorDiv.style.display = 'none';
  
  fetchCatData()
    .then(function(data) {
      renderCatCard(data);
    })
    .catch(function(error) {
      showError(error.message || 'No se pudo cargar el dato');
    });
}

/**
 * Maneja el botón "Volver a Intentar"
 */
function handleRetry() {
  catCard.classList.remove('show');
  startBtn.style.display = 'inline-block';
  retryBtn.style.display = 'none';
  
  // Pequeño delay para animar la transición
  setTimeout(function() {
    handleGetFact();
  }, 300);
}

/**
 * Listeners de eventos
 */
startBtn.addEventListener('click', handleGetFact);
retryBtn.addEventListener('click', handleRetry);

// Nota: La página carga sin mostrar nada hasta que el usuario presiona el botón
console.log('🐱 Aplicación de Datos Curiosos sobre Gatos cargada. ¡Presiona "Obtener Dato Curioso" para comenzar!');
