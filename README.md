# React Router Notes App

A simple full-stack React application using React Router, server-side rendering, and various modern tools and practices.

## Features

- 🚀 Server-side rendering
- 🔄 Data loading and mutations
- 🔒 Authentication and authorization
- 🎉 TailwindCSS for styling
- 🎬 Motion for animations
- ⚡ Vite for fast development and build
- 📦 PNPM for package management
- 🛠️ TypeScript for type safety
- 💾 PostgreSQL + DrizzleORM

## Getting Started

### Installation

Install the dependencies:

```bash
pnpm install
```

### Development

Copy `.env.example` to `.env` and provide a `DATABASE_URL` with your connection string.

Run an initial database migration:

```bash
pnpm exec drizzle-kit push
```

Start the development server with HMR:

```bash
pnpm dev
```

Your application will be available at `http://localhost:3000`.

## Building for Production

Create a production build:

```bash
pnpm build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
# For npm
docker build -t my-app .

# Run the container
docker run -p 3000:3000 --env-file .env my-app
```

### Docker Compose Deployment

A `docker-compose.yml` file is included for easier setup with Docker Compose.
Additionally, you'll need to add `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` for the PostgreSQL service to your `.env` file.

After setting up your `.env` file, run:

```bash
docker-compose up --build
```

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `pnpm build` and drizzle configuration files for database migrations.

```
├── package.json
├── pnpm-lock.yaml (or package-lock.json, or bun.lockb)
├── server.js
├── build/
│   ├── client/        # Static assets
│   └── server/        # Server-side code
├── drizzle.config.ts  # Drizzle ORM configuration
├── database/          # Database required files
│   └── schema.ts
└── start.sh           # Startup script
```

Run the server with:

```bash
./start.sh
```

---

This is just a simple example application, but it demonstrates how to set up a full-stack React application with React Router and various modern tools and practices. Feel free to customize and expand upon it as needed!
