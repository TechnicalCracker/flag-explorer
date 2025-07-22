## Flag Explorer App

A simple full-stack project that displays country flags and details using a public REST API and a custom backend. Built using **Spring Boot**, **Angular 18 (standalone components)**, and integrated with **GitHub Actions** for automated testing and packaging.

---

###  Project Structure

```bash
flag-explorer/
  country-api/         # Backend (Spring Boot)
  country-frontend/    # Frontend (Angular 18)
  .github/workflows/   # CI pipeline
  .gitignore
  README.md
```

---

### Requirements

- Java 17+
- Node.js v20+
- Angular CLI 18
- Maven 3.9+
- Git

---

### Setup Instructions

#### Clone the repo

```bash
git clone https://github.com/TechnicalCracker/flag-explorer.git
cd flag-explorer
```

>  Both backend and frontend are in this mono-repo — no submodules.

---

### Backend (Spring Boot)

#### Run Locally

```bash
cd country-api
./mvnw spring-boot:run
```

The server will start on [http://localhost:8080](http://localhost:8080)

#### API Endpoints

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/countries`        | Returns list of countries |
| GET    | `/countries/{name}` | Returns country details   |

#### Run Backend Tests

```bash
cd country-api
./mvnw test
```

---

### Frontend (Angular 18 Standalone)

#### Install & Run

```bash
cd country-frontend
npm install
ng serve
```

Visit the app at [http://localhost:4200](http://localhost:4200)

#### Run Frontend Tests

```bash
cd country-frontend
npm run test -- --watch=false --browsers=ChromeHeadless
```

#### UI Features

- Home page with all country flags in a responsive grid
- Click a flag to view country **name**, **population**, and **capital**

---

### Testing Summary

- Unit tests for frontend components and service
- Integration test coverage for backend API
- Uses `ChromeHeadless` for CI-safe frontend testing
- No deprecated testing modules

---

### CI/CD Pipeline (GitHub Actions)

Pipeline is configured in `.github/workflows/main.yml`.

It performs the following:

- Runs backend and frontend tests
- Builds the Angular and Spring Boot apps
- Packages the frontend and backend (skipping deployment)

> Automatically triggers on push or pull requests to the `main` branch.

---

### .gitignore

Project-specific `.gitignore` includes:

- Compiled `target/`, `dist/`, `.idea/`, `.vscode/`, and build artifacts
- Properly excludes IntelliJ, Maven, VSCode, and other IDE-generated files

---

### OpenAPI Spec

API is documented using OpenAPI 3.0 (in `country-api/openapi.yaml`) and defines:

- `GET /countries`
- `GET /countries/{name}`
- Includes models for `Country` and `CountryDetails`

---

### Notes

- The app is **not deployed**, but ready for packaging.
- If required, JAR (from `country-api`) and Angular `dist` (from `country-frontend`) are generated via the pipeline.