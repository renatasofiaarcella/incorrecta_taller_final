# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Incorrecta Taller

Tienda de indumentaria desarrollada con React como Proyecto Integrador Front-End.

El proyecto simula una tienda online completa con catálogo de productos, carrito de compras, autenticación de usuarios, roles, panel administrador y CRUD de productos.

## Demo

La aplicación estará disponible en:

[Ver demo en Vercel] ( hice esto primero, luego lo subo a vercel)
## Funcionalidades

- Catálogo de productos
- Búsqueda de productos
- Filtro por categoría
- Ordenamiento por precio y nombre
- Carrito de compras
- Incremento y disminución de cantidades
- Control de stock
- Registro e inicio de sesión
- Roles de administrador y cliente
- Rutas protegidas
- Panel administrador
- Gestión de usuarios
- CRUD completo de productos
- Notificaciones con SweetAlert2
- Loader personalizado
- Diseño responsive
- Campaña editorial AW26
- Página institucional de la marca

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Bootstrap
- SweetAlert2
- JSON Server
- Git y GitHub
- Vercel

## Estructura principal

```text
src/
├── components/
│   ├── layout/
│   └── pages/
├── context/
├── hooks/
│   ├── products/
│   └── user/
├── utils/
├── App.jsx
├── App.css
├── main.jsx
└── router.jsx
