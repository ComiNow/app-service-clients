# AppServiceClient

**ComiNow Client Frontend** - Aplicación web para pedidos de clientes en restaurantes.

Este proyecto fue generado usando [Angular CLI](https://github.com/angular/angular-cli) version 19.2.4.

## 🌐 Producción

**URL de Producción:** https://d3gwsdg49ynx4o.cloudfront.net

El deployment se realiza automáticamente mediante GitHub Actions al hacer push a la rama `main`.  
Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para más detalles.

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🚀 Deployment

Esta aplicación se despliega automáticamente en AWS S3 + CloudFront mediante GitHub Actions.

- **Guía completa de deployment:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Configuración de GitHub Secrets:** [.github/GITHUB_SECRETS_SETUP.md](.github/GITHUB_SECRETS_SETUP.md)
- **Recursos de AWS:** [.aws-resources.md](.aws-resources.md)

### Quick Deploy
```bash
git push origin main  # Deploy automático a producción
```

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── config/           # Configuración de la app
│   ├── interfaces/       # Interfaces TypeScript
│   ├── services/         # Servicios globales
│   ├── shared/           # Componentes compartidos
│   └── store/            # Módulo de tienda
│       ├── components/   # Componentes de tienda
│       ├── pages/        # Páginas de tienda
│       ├── services/     # Servicios de tienda
│       └── layouts/      # Layouts de tienda
└── environments/         # Configuración por ambiente
```

---

**Proyecto:** ComiNow  
**Versión:** 0.0.0  
**Última actualización:** 2025-11-04
