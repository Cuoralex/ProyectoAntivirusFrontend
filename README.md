![Saludo](public/Antivirus.jpg)


# Frontend del Proyecto Antivirus EAFIT

Este repositorio contiene el código fuente del frontend del proyecto Antivirus EAFIT, desarrollado con Remix para la interfaz de usuario.

## Tecnologías Utilizadas

- **Remix**: `2.15.3` – Framework de React para SSR y manejo eficiente de datos.
- **React**: `18.2.0` – Biblioteca para construir interfaces de usuario interactivas.
- **Tailwind CSS**: `3.4.4` – Para estilos rápidos y reutilizables.
- **i18next**: `24.2.2` – Internacionalización y traducción de la aplicación.
- **Lucide-react**: `0.477.0` – Íconos SVG para React.
- **Vite**: `5.1.0` – Herramienta de desarrollo y construcción rápida.
- **TypeScript**: `5.1.6` – Tipado estático para mayor robustez.

## Requisitos Previos

Antes de instalar y ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** `>=20.0.0`
- **npm** (administrador de paquetes de Node.js)

## Instalación

1. Clona este repositorio:
   ```sh
   git clone https://github.com/Cuoralex/ProyectAntivirusFrontend.git
   ```

2. Navega al directorio del proyecto:
   ```sh
   cd ProyectAntivirusFrontend
   ```

3. Instala las dependencias:
   ```sh
   npm run dev
   ```

## Scripts disponibles

Scripts Disponibles

1. npm run dev: Inicia el entorno de desarrollo.

2. npm run build: Compila la aplicación para producción.

3. npm run start: Ejecuta la aplicación en producción.

4. npm run lint: Verifica errores de estilo con ESLint.

## Repositorio backend

1. Repositorio backend: 
```sh
    URL=https://github.com/Cuoralex/ProyectAntivirusBackend.git
   ```

2. Asegúrate de que el backend está en ejecución en el puerto correcto.
 ```sh
   API_URL=http://localhost:5055/swagger/index.html
   ```

## Ejecución

Para iniciar el servidor de desarrollo, ejecuta:

```sh
npm run dev
```

El proyecto estará disponible en `http://localhost:5173/`.

## Estructura del Proyecto

```
/antivirus-eafit-frontend
│── public/              # Recursos estáticos
│── app/
│   ├── assets/          # Archivos estáticos y multimedia
│   ├── components/      # Componentes reutilizables
│   │   ├── atoms/       # Componentes más pequeños e independientes
│   │   ├── molecules/   # Conjunto de átomos que trabajan juntos
│   │   ├── organisms/   # Componentes más complejos
│   │   ├── templates/   # Plantillas reutilizables
│   │   ├── remix.config.js # Configuración de Remix
│   ├── routes/          # Páginas y rutas Remix
│   ├── services/        # Lógica de negocio y llamadas a la API
│   ├── styles/          # Archivos de estilos y configuración de Tailwind CSS
│   ├── utils/           # Funciones auxiliares
│   ├── app.tsx         # Componente raíz de la aplicación
│   ├── entry.client.tsx # Punto de entrada para el cliente
│   ├── entry.server.tsx # Punto de entrada para el servidor
│   ├── root.tsx        # Configuración principal de la aplicación
│   ├── tailwind.css    # Configuración de estilos
│── .env                 # Variables de entorno
│── package.json         # Dependencias y scripts
│── remix.config.js      # Configuración de Remix
│── tsconfig.json        # Configuración de TypeScript
```

## Características

- **Gestión de oportunidades**: Visualización y filtrado de oportunidades.
- **Autenticación**: Login y manejo de sesiones.
- **Interfaz moderna**: Uso de Tailwind CSS para un diseño atractivo.
- **Internacionalización**: Implementación de i18next para soporte multilenguaje.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npm run build`: Construye la aplicación para producción.
- `npm run start`: Inicia la aplicación en modo producción.
- `npm run lint`: Ejecuta el linter para verificar errores de código.
- `npm run typecheck`: Verifica los tipos con TypeScript.

## Contribuciones

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza cambios y confirma (`git commit -m "Descripción del cambio"`).
4. Envía un PR para revisión.

## Authors
Repositorios                 | Link  
-------------------------|------
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@Andrés Tamayo Marín](https://github.com/baldurt1992)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@David Gutierrez Gordillo](https://github.com/davalejo)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@Diana López Ramos](https://github.com/Dianakrol)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@Diana Roldan Rodriguez](https://github.com/DianaR162)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@Geny Vargas Suarez](https://github.com/genyvarsua)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=flat&logo=github&logoColor=white)](https://github.com) | [@Alexandra Cuartas Orozco](https://github.com/Cuoralex)