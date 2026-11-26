# Reto de automatización: búsqueda en Liverpool

![Pruebas](https://github.com/aponcewo/liverpool-playwright-challenge/actions/workflows/test.yml/badge.svg)

Framework de pruebas E2E con **Playwright y TypeScript** que automatiza una búsqueda en
liverpool.com.mx y valida los resultados de la página contra la respuesta de la API.

## Qué hace la prueba

1. Abre Liverpool y busca "playstation 5".
2. Filtra por color blanco y ordena por menor precio.
3. Extrae el nombre y el precio de los primeros 5 productos, y los imprime en la consola.
4. Intercepta la respuesta de la API de búsqueda, y compara cada producto de la página
   contra ella por ID, nombre y precio.
5. Valida que al menos 3 de los 5 productos coincidan, y registra cualquier diferencia.

## Requisitos

- Node.js, versión LTS.

## Instalación

```bash
npm ci
npx playwright install --with-deps chromium
```

## Ejecución

| Comando | Qué hace |
|---|---|
| `npm test` | Ejecuta las pruebas en modo headless (por defecto) |
| `npm run test:headed` | Ejecuta las pruebas con el navegador visible. Requiere una computadora con pantalla |
| `npm run report` | Abre el reporte HTML de la última ejecución |

Para buscar otro producto, sin tocar el código:

```bash
TEST_SEARCH_TERM="xbox series x" npm test
```

Datos configurables con variables de entorno: `TEST_SEARCH_TERM`, `TEST_COLOR`,
`TEST_SORT_OPTION`, `TEST_PRODUCTS_TO_EXTRACT` y `TEST_MIN_MATCHES`.

## Estructura

| Carpeta o archivo | Qué contiene |
|---|---|
| `playwright.config.ts` | Navegador, tamaño de ventana, capturas, video y reporte |
| `config/test-data.ts` | Los datos de prueba |
| `pages/` | Los Page Objects: la página de inicio y la de resultados |
| `utils/` | Conversión de precios y el comparador entre la página y la API |
| `tests/` | La prueba de humo y la prueba del flujo completo |
| `.github/workflows/test.yml` | El pipeline: instala, ejecuta en headless y sube el reporte |
| `TEST_STRATEGY.md` | La estrategia de pruebas |

## Reportes y evidencias

- Reporte HTML de cada ejecución, disponible como artefacto en GitHub Actions.
- Captura automática y video cuando una prueba falla.
- Trace de la ejecución cuando una prueba se reintenta en el CI.

## Uso de IA

Usé un asistente de IA como apoyo para generar parte del código. La exploración del sitio, la elección de los localizadores, la identificación del campo de precio correcto en la API y la estrategia de pruebas se basan en mi análisis. Cada pieza fue ejecutada y verificada, incluida una prueba forzando un campo incorrecto para confirmar que el comparador detecta diferencias.

## Mejoras pendientes

- Validar que los precios estén ordenados de menor a mayor.
- Reportar como "bloqueada" una ejecución que encuentre la protección contra bots.
- Ejecutar el flujo en un job programado y no bloqueante.
- Ejecución en varios navegadores y con varios términos de búsqueda.