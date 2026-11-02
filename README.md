# Proyectos Open Source en Español

Índice curado de **245 proyectos open-source** traducidos al español, con un diseño editorial tipo *broadsheet*. Sitio estático pensado para publicarse en GitHub Pages.

## Qué es

Un índice de proyectos open-source destacados (herramientas de IA, CLI, bases de datos vectoriales, e-commerce, CMS, backup, transcripción y más), cada uno con su descripción traducida, categoría, lenguaje y estrellas de GitHub.

Los datos se enriquecen con la API de GitHub (descripción canónica, estrellas, lenguaje).

## Cómo funciona

Sitio estático sin dependencias de build:

- `index.html` — estructura y textos de la interfaz (en español).
- `css/style.css` — estética editorial (tema claro/oscuro).
- `js/projects.js` — datos de los 245 proyectos (generado).
- `js/app.js` — render, búsqueda, orden y conmutador de tema.

La búsqueda filtra por nombre de repositorio, descripción, lenguaje y categoría. El orden por defecto es por estrellas (destacados); se puede alternar a orden alfabético.

## Publicar en GitHub Pages

1. Crear el repositorio y empujar a GitHub.
2. En *Settings → Pages*, elegir *Deploy from a branch*, rama `main`, carpeta `/ (root)`.

El sitio queda disponible en `https://<usuario>.github.io/open-source-es/`.

## Estructura

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── projects.js   # datos (generado)
│   └── app.js
└── README.md
```

## Licencia

Código del sitio bajo licencia MIT. Los datos de proyectos pertenecen a sus respectivos repositorios.
