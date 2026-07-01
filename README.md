# CRM Backend - Arquitectura Hexagonal + DDD

Backend del sistema CRM de Citas para Negocios, desarrollado con **Node.js**, **TypeScript**, **Express** y **Arquitectura Hexagonal + Domain-Driven Design (DDD)**.

## Integrantes del Grupo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| Luis Fabricio Rivero Aban | Frontend & POO | @FabricioRivero |
| Santiago Antonio Encinas Jadue | Modelos & Lógica | @SantiagoEncinas |
| Santiago Zamora Barrios | Servicios & UI | @SantiagoZamora |

## Tecnologías

- **Lenguaje:** TypeScript
- **Framework:** Express.js
- **Arquitectura:** Hexagonal (Puertos y Adaptadores) + DDD
- **Testing:** Jest + Supertest (Unitarios, Integración, E2E)
- **Herramientas:** Node.js, npm, ts-node-dev

## Estructura del Proyecto (Arquitectura Hexagonal)
crm-backend/
├── .env                                    # Variables de entorno (PORT=3000)
├── .gitignore                              # Ignora node_modules, dist, coverage
├── jest.config.js                          # Configuración de Jest
├── package.json                            # Dependencias y scripts
├── package-lock.json                       # Lock de dependencias
├── tsconfig.json                           # Configuración TypeScript
├── src/
│   ├── app.ts                              # Configuración Express (routes, CORS)
│   ├── server.ts                           # Punto de entrada (levanta servidor)
│   ├── shared/
│   │   └── domain/
│   │       ├── DomainError.ts              # Clase de error de dominio
│   │       └── Persona.ts                  # Clase abstracta base
│   └── modules/
│       ├── clientes/
│       │   ├── domain/
│       │   │   ├── Cliente.ts              # Entidad Cliente
│       │   │   ├── Empleado.ts             # Entidad Empleado
│       │   │   ├── Email.ts                # Value Object Email
│       │   │   ├── Telefono.ts             # Value Object Teléfono
│       │   │   ├── ClienteRepository.ts    # Puerto (interfaz)
│       │   │   └── EmpleadoRepository.ts  # Puerto (interfaz)
│       │   ├── application/
│       │   │   ├── RegistrarClienteUseCase.ts
│       │   │   ├── ListarClientesUseCase.ts
│       │   │   └── BuscarClientePorIdUseCase.ts
│       │   └── infrastructure/
│       │       ├── InMemoryClienteRepository.ts
│       │       ├── ClienteController.ts
│       │       └── clientes.routes.ts
│       └── citas/
│           ├── domain/
│           │   ├── Cita.ts                 # Entidad Cita
│           │   ├── EstadoCita.ts           # Value Object Estado con reglas
│           │   └── CitaRepository.ts       # Puerto (interfaz)
│           ├── application/
│           │   ├── AgendarCitaUseCase.ts
│           │   ├── CambiarEstadoCitaUseCase.ts
│           │   └── ListarCitasUseCase.ts
│           └── infrastructure/
│               ├── InMemoryCitaRepository.ts
│               ├── CitaController.ts
│               └── citas.routes.ts
└── tests/
    ├── e2e/
    │   └── api.test.ts                     # 6 tests E2E (Supertest)
    ├── integration/
    │   └── InMemoryCitaRepository.integration.test.ts  # 4 tests integración
    └── unit/
        ├── citas/
        │   ├── Cita.test.ts                # 6 tests entidad Cita
        │   └── EstadoCita.test.ts            # 5 tests Value Object Estado
        └── clientes/
            ├── Cliente.test.ts             # 8 tests (Email, Teléfono, Cliente)
            └── RegistrarClienteUseCase.test.ts  # 4 tests caso de uso


## Conceptos POO Aplicados

| Concepto | Implementación |
|----------|---------------|
| **Abstracción** | Clase `Persona` abstracta |
| **Herencia** | `Cliente` y `Empleado` heredan de `Persona` |
| **Polimorfismo** | `getRol()` implementado diferente en cada subclase |
| **Encapsulamiento** | Atributos `private`/`protected` con getters |
| **Interfaces** | `ClienteRepository`, `CitaRepository` (puertos) |
| **Genéricos** | Repositorio genérico en memoria |
| **Excepciones** | `DomainError` para validaciones de negocio |

## Instalación y Ejecución

```bash
# Clonar
git clone https://github.com/FabricioRivero/crm-backend.git
cd crm-backend

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Compilar
npm run build

# Ejecutar compilado
npm start

El servidor corre en http://localhost:3000

Tests
# Todos los tests
npm test

# Solo unitarios
npm run test:unit

# Solo integración
npm run test:integration

# Solo E2E
npm run test:e2e

# Con cobertura
npm run test:coverage

Resultados de Tests
33 tests en total
23 unitarios (dominio + casos de uso)
4 de integración (adaptadores reales)
6 E2E (endpoints HTTP con Supertest)

API Endpoints
| Método | Endpoint                | Descripción            |
| ------ | ----------------------- | ---------------------- |
| GET    | `/health`               | Estado del servidor    |
| POST   | `/api/clientes`         | Crear cliente          |
| GET    | `/api/clientes`         | Listar clientes        |
| GET    | `/api/clientes/:id`     | Buscar cliente por ID  |
| POST   | `/api/citas`            | Agendar cita           |
| GET    | `/api/citas`            | Listar citas           |
| PATCH  | `/api/citas/:id/estado` | Cambiar estado de cita |

Arquitectura Hexagonal
El dominio (entidades, value objects, puertos) no depende de ninguna tecnología externa. Los adaptadores (Express, repositorios en memoria) implementan los puertos definidos por el dominio. Esto permite cambiar la base de datos o el framework web sin tocar la lógica de negocio.