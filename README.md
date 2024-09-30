<div align="center">
  <a href="https://github.com/Luismiguelrambla/prueba-front-fujitsu">
    <img src="./public/logo-fujitsu.svg" alt="Logo" width="300" height="100">
  </a>
</div>
<br />

# Prueba front-end Fujitsu 🌐

Este es un proyecto de aplicación web construido con **React**, **TypeScript**, **Vite** y se utiliza **PrimeReact** como framework visual para facilitar el desarrollo de la interfaz de usuario. En esta documentación encontrarás cómo llevar a cabo la compilación y ejecución en ambos entornos: desarrollo y producción. Además, se detallan las mejoras de accesibilidad implementadas y las futuras mejoras a considerar. Al final del documento, también encontrarás un enlace a una demo de la aplicación.

<br/>

## Configuración del Proyecto 🛠️

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Luismiguelrambla/prueba-front-fujitsu.git
   cd prueba-front-fujitsu
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso de MockAPI para Datos 📦

En este proyecto, se ha utilizado **MockAPI** para simular los datos necesarios para la configuración del entorno. A continuación, se presentan los modelos de datos:

### Modelos de Datos 🗂️

```typescript
export interface ITags {
  bag: number; // Número de etiquetas en bolsa
  box: number; // Número de etiquetas en caja
}

export interface IDocument {
  id: string; // Identificador único del documento
  name: string; // Nombre del documento
  description: string; // Descripción del documento
  template: string; // Plantilla utilizada
  date: string; // Fecha de creación del documento
  status: string; // Estado del documento
  validation: number; // Nivel de validación
  pendingValidation: boolean; // Indica si está pendiente de validación
  favorite: boolean; // Indica si el documento es favorito
  tags: ITags; // Etiquetas asociadas al documento
  constraints: any[]; // Restricciones del documento
  sourceEvaluation: string; // Evaluación de la fuente del documento
}
```

## Archivos de Configuración 📂

Asegúrate de crear los siguientes archivos en la raíz del proyecto:

- `.env`:

  ```bash
  VITE_API_KEY="API_KEY"
  ```

- `.env.production`: (configuraciones específicas para producción, si es necesario)

## Compilación y Ejecución 🔄

### Modo Desarrollo 🌱

Para iniciar la aplicación en modo desarrollo, ejecuta:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (puedes cambiar el puerto en la configuración si es necesario).

### Modo Producción 🚀

Para compilar la aplicación para producción, ejecuta:

```bash
npm run build
```

Esto generará los archivos de producción en la carpeta `dist`. Para ejecutar la aplicación en modo producción localmente, utiliza un servidor estático como `serve`:

1. Instala serve si no lo tienes:

   ```bash
   npm install -g serve
   ```

2. Ejecuta el servidor:

   ```bash
   serve -s dist
   ```

Tu aplicación estará disponible en `http://localhost:5000`.

## Mejoras de Accesibilidad ♿

Se han implementado las siguientes mejoras de accesibilidad en la aplicación:

- Uso de roles ARIA para mejorar la navegación mediante teclado y lectores de pantalla.
- Inclusión de etiquetas y descripciones en elementos interactivos para proporcionar contexto adicional.
- Uso del tema Saga-blue de PrimeReact asegurando que el contraste de colores sea adecuado (AA).
- Se han añadido atributos alt a todas las imágenes para mejorar la accesibilidad.

## Futuras Mejoras 🚧

Futuras mejoras que se pueden implementar en la aplicación:

- Realizar pruebas de accesibilidad con herramientas automatizadas como Lighthouse.
- Crear notificaciones para avisar al usuario de las acciones y errores de la aplicación.
- Continuar refactorizar el código y la arquitectura de carpetas para mejorar la mantenibilidad y legibilidad.

## Demo 💻

Para ver una demostración en vivo de la aplicación, visita el siguiente enlace:

[Demo de la Aplicación](https://66fa294520084cfef3dad667--soft-monstera-e81510.netlify.app/)
