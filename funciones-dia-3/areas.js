// Crea una funcion para calulcar el are de un
//  circulo dado su radio 

/**
 * Calcula el área de un círculo a partir de su radio.
 *
 * Utiliza una aproximación de π (3.1416). El parámetro `radio` debe ser un número
 * que representa la distancia desde el centro hasta la circunferencia, en las mismas
 * unidades que se desea obtener en el resultado. Si se proporciona un valor no
 * numérico o `NaN`, el resultado será `NaN`. Si se proporciona un radio negativo,
 * la función usa ese valor tal cual (no lo normaliza a positivo).
 *
 * @param {number} radio - Radio del círculo (en unidades). Se recomienda un valor no negativo.
 * @returns {number} Área del círculo en unidades al cuadrado.
 * @example
 * // Calcula el área de un círculo de radio 5:
 * // areaCirculo(5) -> aproximadamente 78.54
 */
function areaCirculo(radio) {
    const pi = 3.1416;
    return pi * radio * radio;
}

// Crea una funcion para calcular el area de un rectangulo dado su base y altura
/**
 * Calcula el área de un rectángulo.
 *
 * Esta función recibe la longitud de la base y la altura (en las unidades que utilice
 * el llamador) y devuelve el área resultante (base × altura). No realiza validaciones
 * explícitas sobre los tipos o valores de entrada (por ejemplo, no maneja valores negativos
 * o no numéricos).
 *
 * @param {number} base - Longitud de la base del rectángulo.
 * @param {number} altura - Altura del rectángulo.
 * @returns {number} Área del rectángulo (base por altura).
 */
function areaRectangulo(base, altura) {
    return base * altura;
}

// Vamos a calcular el volumen de un cilindro 
// El volumen es Area de la base (circulo) * altura
/**
 * Calcula el volumen de un cilindro a partir del radio de su base y su altura.
 *
 * Esta función obtiene el área de la base llamando a areaCirculo(radio) y la
 * multiplica por la altura para obtener el volumen:
 *   V = área_base * altura
 *
 * @param {number} radio - Radio de la base del cilindro. Debe ser un número >= 0.
 * @param {number} altura - Altura del cilindro. Debe ser un número >= 0.
 * @returns {number} El volumen del cilindro (misma unidad cúbica que las unidades de entrada).
 * @throws {TypeError} Si `radio` o `altura` no son números.
 * @throws {RangeError} Si `radio` o `altura` son valores negativos.
 * @see areaCirculo
 * @example
 * // Ejemplo: volumen de un cilindro con radio 3 unidades y altura 5 unidades
 * // Resultado aproximado: (π * 3^2) * 5 ≈ 141.37
 * const volumen = volumenCilindro(3, 5);
 */
function volumenCilindro(radio, altura) {
    const areaBase = areaCirculo(radio);
    return areaBase * altura;
}

// Crea una funcion para calcular una derivada simpe de una funcion polinomial de la forma ax^n
/**
 * Calcula la derivada de un monomio de la forma a * x^n y devuelve
 * el nuevo coeficiente y exponente como un objeto.
 *
 * @param {number} a - Coeficiente del monomio (a).
 * @param {number} n - Exponente del monomio (n).
 * @returns {{coeficiente: number, exponente: number}} Objeto con:
 *   - coeficiente: el nuevo coeficiente (a * n)
 *   - exponente: el nuevo exponente (n - 1)
 *
 * Nota: Para una constante (n = 0) la derivada es 0; la implementación
 * devuelve { coeficiente: 0, exponente: -1 } porque aplica n - 1.
 *
 * Ejemplo:
 * // Para 3x^2 la derivada es 6x
 * // derivadaPolinomio(3, 2) devuelve { coeficiente: 6, exponente: 1 }
 *
 * @example
 * const resultado = derivadaPolinomio(3, 2);
 * // resultado -> { coeficiente: 6, exponente: 1 }
 */
function derivadaPolinomio(a, n) {
    const nuevoCoeficiente = a * n;
    const nuevoExponente = n - 1;
    return { coeficiente: nuevoCoeficiente, exponente: nuevoExponente };
}

// Crea una funcion para calcular una integral simple de una funcion polinomial de la forma ax^n
/**
 * Calcula la integral indefinida (antiderivada) del término polinómico a * x^n.
 *
 * @param {number} a - Coeficiente del término (a) en a * x^n.
 * @param {number} n - Exponente (n) del término. Se espera un número (habitualmente entero).
 * @returns {{coeficiente: number, exponente: number}} Objeto con:
 *   - coeficiente: nuevo coeficiente tras la integración (a / (n + 1))
 *   - exponente: nuevo exponente tras la integración (n + 1)
 *
 * Nota: este cálculo corresponde a la regla de potencia para integrales:
 * ∫ a * x^n dx = (a / (n + 1)) * x^(n + 1) + C.
 * No se maneja el caso n === -1 (la integral sería logarítmica).
 *
 * @example
 * // Integral de 3 * x^2 es x^3 (coeficiente 1, exponente 3)
 * // integralPolinomio(3, 2) => { coeficiente: 1, exponente: 3 }
 *
 * @example
 * // Integral de 5 (5 * x^0) es 5 * x (coeficiente 5, exponente 1)
 * // integralPolinomio(5, 0) => { coeficiente: 5, exponente: 1 }
 */
function integralPolinomio(a, n) {
    const nuevoCoeficiente = a / (n + 1);
    const nuevoExponente = n + 1;
    return { coeficiente: nuevoCoeficiente, exponente: nuevoExponente };
}