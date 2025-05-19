# 🌦️ Weather Forecast Service

A NestJS-based weather notification service that allows users to subscribe to weather updates via email. Users can choose a city and the frequency (daily or hourly) of updates.

## 📡 API Endpoints

### `GET /api/weather?city={city}`
Get the current weather for a specific city.
- **Query parameters:**
  - `city` – Name of the city

### `POST /api/subscribe`
Subscribe an email to weather updates.

- Sends a confirmation email with a link.

### `GET /api/confirm/{token}`
Confirms email subscription for weather notifications.
- Token is sent via email after subscribing.
- Activates weather notifications upon confirmation.

### `GET /api/unsubscribe/{token}`
Unsubscribes from weather updates.
- Token is included in each weather update email.
- Stops all future notifications.

## ⚙️ Development & Run Commands

**Start the database only:**
`docker compose up db`
Starts only the PostgreSQL database container. Useful when running the app locally without the full Docker environment.

**Run migrations:**
`npm run migration:run`
Runs TypeORM migrations to apply the latest database schema changes.

**Start development server:**
`npm run start:dev`
Starts the NestJS app in development mode with hot reload enabled.

**Build and run full application:**
`docker compose up --build`
Builds and starts the full application in Docker, including the app and the database. Use this to test the production-like environment locally.

**Run unit tests:**
`npm run test`
Runs unit tests using Jest.

**Run end-to-end tests:**
`npm run test:e2e:full`
Runs end-to-end (E2E) tests, spinning up the actual app and database to validate full workflow.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the database with `docker compose up db`
4. Run migrations with `npm run migration:run`
5. Start the application with `npm run start:dev`

## Technology Stack

- NestJS framework
- PostgreSQL database
- TypeORM for database interactions
- Docker for containerization
