# Rick and Morty App

Aplicación desarrollada con Next.js + TypeScript utilizando la API GraphQL de Rick and Morty.

---

# Tecnologías

- Next.js 15
- React
- TypeScript
- TailwindCSS
- Apollo Client
- GraphQL
- Zustand
- Recharts

---

# Instalación

## 1. Clonar repositorio

```bash
git clone <TU_REPOSITORIO>
```

## 2. Entrar al proyecto

```bash
cd rick-morty-app
```

## 3. Instalar dependencias

```bash
npm install
```

## 4. Crear variables de entorno

Crear archivo:

```bash
.env.local
```

Agregar:

```env
NEXT_PUBLIC_GRAPHQL_URL=https://rickandmortyapi.com/graphql
```

## 5. Ejecutar proyecto

```bash
npm run dev
```

Abrir:

```txt
http://localhost:3000
```

---

# Funcionalidades

- Búsqueda de personajes
- Vista grid/list
- Detalle de personaje
- Favoritos persistentes
- Máximo 5 favoritos
- Reordenamiento de favoritos
- Gráfica por especies
- Responsive design
- Loading states
- Error handling

---

# Estructura del proyecto

```txt
src/
│
├── app/
│   ├── character/
│   ├── favorites/
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── page.tsx
│
├── components/
│   ├── character/
│   ├── charts/
│   ├── favorites/
│   ├── layout/
│   ├── search/
│   ├── shared/
│   └── ui/
│
├── graphql/
│   ├── queries/
│   └── client.ts
│
├── hooks/
├── store/
├── utils/
├── lib/
├── types/
└── constants/
```

---

# Arquitectura

## Server Components

Se utilizan para:

- SSR
- Fetch inicial
- Queries GraphQL
- Renderizado principal

## Client Components

Se utilizan únicamente para:

- interacción del usuario
- favoritos
- búsqueda
- charts
- estado global

---

# Estado global

Se utiliza Zustand para:

- favoritos
- persistencia
- reorder

---

# API

```txt
https://rickandmortyapi.com/graphql
```

---

# Scripts

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Producción

```bash
npm run start
```

---

# Objetivo

Prueba técnica Frontend desarrollada con:

- Next.js
- TypeScript
- GraphQL
- Zustand
- Arquitectura limpia
- Buenas prácticas modernas
