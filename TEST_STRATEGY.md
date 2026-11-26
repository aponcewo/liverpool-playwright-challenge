# Estrategia de pruebas

## 1. Qué no automatizaría, y por qué

- **Precios y cantidades exactas.** Los precios cambian a diario, hay productos con
  y sin descuento, y la cantidad de artículos pasó de 89 a 87 en minutos mientras
  exploraba el sitio. Una prueba con valores fijos fallaría sin un defecto real. En
  su lugar, valido que la página coincida con la respuesta de la API en el mismo
  momento.
- **Banners y promociones.** Cambian todos los días, y evaluar si se ven bien depende
  del criterio visual de una persona.
- **La compra en el sitio real.** Se cobraría dinero y se generaría un pedido real, y
  como la prueba corre en el pipeline, se repetiría en cada Pull Request. La compra
  se automatizaría en un ambiente de pruebas, con tarjetas de prueba.

## 2. Si Liverpool agregara un CAPTCHA

- **No lo resolvería con la automatización:** el CAPTCHA existe para detectar bots,
  y el sitio puede cambiarlo en cualquier momento.
- **Lo coordinaría con el equipo del sitio:** deshabilitarlo en el ambiente de
  pruebas, o que el sitio reconozca el tráfico de las pruebas automatizadas.
- **Ya enfrenté un caso real en este reto.** La primera prueba de humo devolvió
  "Access Denied": la protección contra bots bloqueaba el navegador automatizado.
  Lo detecté antes de construir el framework, y lo resolví con el modo headless
  nuevo de Chromium y una identidad de navegador normal. En un proyecto real,
  pediría un ambiente de pruebas.
- **Si el bloqueo aparece igual,** la prueba debería reportarlo como "bloqueada", y
  no como un defecto del producto.

## 3. Riesgos de inestabilidad, y cómo los mitigué

- **Bloqueo contra bots:** modo headless nuevo, identidad de navegador normal, e
  idioma y zona horaria de México, en la configuración.
- **Diseño que cambia con el tamaño de la ventana:** la página duplica elementos,
  como el buscador. Fijé el tamaño de la ventana y localizo por rol, que ignora los
  elementos ocultos.
- **Identificadores generados automáticamente:** no los uso; localizo por rol y
  nombre visible.
- **La página tarda en actualizarse:** al filtrar y ordenar, la prueba espera la
  respuesta concreta de la API, en lugar de esperas fijas.
- **Datos que cambian en tiempo real:** comparo la página contra la API en el mismo
  momento, en lugar de valores fijos.
- **Variables de entorno que chocan con el sistema:** uso un prefijo propio.

## 4. En un pipeline con más de 50 suites

- **No la correría en cada Pull Request:** depende de un sitio externo y tarda. La
  ejecutaría de forma programada, por ejemplo de noche, y antes de cada liberación.
- **Una caída del sitio externo no debería bloquear al equipo:** en un job separado,
  que avise si falla, pero no impida integrar el trabajo de los demás.
- **Ejecución en paralelo:** repartiría las suites entre varios workers y, si hace
  falta, entre varias máquinas.
- **Fallos intermitentes visibles:** en el CI, la prueba se reintenta hasta dos veces
  y graba un trace. Si pasa al reintentar, el reporte la marca como flaky: una señal
  para investigarla, no para ignorarla.