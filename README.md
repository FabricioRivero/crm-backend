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

## Estructura del Proyecto

```
src/
├── shared/
│   └── domain/
│       ├── DomainError.ts          # Excepción base de dominio
│       └── Persona.ts              # Clase abstracta base
├── modules/
│   ├── clientes/
│   │   ├── domain/                 # Entidades, Value Objects, Puertos
│   │   │   ├── Cliente.ts
│   │   │   ├── Empleado.ts
│   │   │   ├── Especialidad.ts     # Value Object
│   │   │   ├── Email.ts            # Value Object
│   │   │   ├── Telefono.ts         # Value Object
│   │   │   ├── ClienteRepository.ts   # Puerto (interfaz)
│   │   │   └── EmpleadoRepository.ts  # Puerto (interfaz)
│   │   ├── application/            # Casos de uso
│   │   │   ├── RegistrarClienteUseCase.ts
│   │   │   ├── ListarClientesUseCase.ts
│   │   │   └── BuscarClientePorIdUseCase.ts
│   │   └── infrastructure/         # Adaptadores
│   │       ├── InMemoryClienteRepository.ts
│   │       ├── ClienteController.ts
│   │       └── clientes.routes.ts
│   └── citas/
│       ├── domain/
│       │   ├── Cita.ts
│       │   ├── EstadoCita.ts       # Value Object con reglas de transición
│       │   └── CitaRepository.ts   # Puerto
│       ├── application/
│       │   ├── AgendarCitaUseCase.ts
│       │   ├── CambiarEstadoCitaUseCase.ts
│       │   └── ListarCitasUseCase.ts
│       └── infrastructure/
│           ├── InMemoryCitaRepository.ts
│           ├── CitaController.ts
│           └── citas.routes.ts
├── app.ts                          # Configuración Express (testeable sin puerto)
└── server.ts                       # Punto de entrada

tests/
├── unit/          # Dominio + casos de uso (con repos mockeados)
├── integration/   # Adaptadores reales (InMemoryCitaRepository)
└── e2e/           # Endpoints HTTP completos con Supertest
```

## Conceptos POO / DDD Aplicados

| Concepto | Implementación |
|----------|---------------|
| **Abstracción** | Clase `Persona` abstracta |
| **Herencia** | `Cliente` y `Empleado` heredan de `Persona` |
| **Polimorfismo** | `getRol()` implementado distinto en cada subclase |
| **Encapsulamiento** | Atributos `private`/`protected` con getters |
| **Interfaces (Puertos)** | `ClienteRepository`, `CitaRepository`, `EmpleadoRepository` |
| **Value Objects** | `Email`, `Telefono`, `Especialidad`, `EstadoCita` (inmutables, se autovalidan) |
| **Excepciones de dominio** | `DomainError` en vez de `Error` genérico |
| **Inversión de dependencias** | Casos de uso dependen de interfaces, no de implementaciones concretas |

## Instalación y Ejecución

```bash
git clone https://github.com/FabricioRivero/crm-backend.git
cd crm-backend
npm install

npm run dev      # desarrollo (recarga automática)
npm run build     # compila a dist/
npm start        # ejecuta el compilado
```

El servidor corre en `http://localhost:3000`

## Tests

```bash
npm test               # todos
npm run test:unit      # solo unitarios
npm run test:integration
npm run test:e2e
npm run test:coverage  # con cobertura
```

### Resultado actual (verificado)

```
Test Suites: 8 passed, 8 total
Tests:       37 passed, 37 total
```

- **26 unitarios** — dominio (entidades, value objects) y casos de uso con repositorios mockeados
- **4 de integración** — adaptador real `InMemoryCitaRepository` contra el contrato del puerto
- **8 E2E** — endpoints HTTP reales golpeados con Supertest sobre la app Express completa

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado del servidor |
| POST | `/api/clientes` | Registrar cliente |
| GET | `/api/clientes` | Listar clientes |
| GET | `/api/clientes/:id` | Buscar cliente por ID |
| POST | `/api/citas` | Agendar cita |
| GET | `/api/citas` | Listar citas (`?clienteId=` opcional) |
| PATCH | `/api/citas/:id/estado` | Cambiar estado (`{"accion": "confirmar" \| "completar" \| "cancelar"}`) |

## Arquitectura Hexagonal — Por qué importa

El **dominio** (`domain/`) no depende de Express, ni de una base de datos, ni de ningún framework. Define **puertos** (interfaces como `ClienteRepository`).

La **infraestructura** (`infrastructure/`) implementa esos puertos con **adaptadores** concretos (hoy en memoria; mañana podría ser MongoDB o PostgreSQL) sin que el dominio se entere del cambio.

La **aplicación** (`application/`) orquesta: recibe datos primitivos, arma entidades de dominio, invoca reglas de negocio, y usa el puerto para persistir — sin saber si eso termina en memoria o en un disco.

Esto es lo que permite, por ejemplo, testear `RegistrarClienteUseCase` con un repositorio *mockeado* en segundos, sin levantar ninguna base de datos real.
