# Warehouse Management System

This project is a modern warehouse management system application. It consists of a frontend developed with Next.js and a backend developed with .NET.

## Project Structure

The project consists of two main components:

- **Frontend**: A modern web application developed with Next.js, TypeScript, and Tailwind CSS
- **Backend**: A RESTful API service developed with .NET

## Technologies

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- ESLint
- Docker

### Backend

- .NET
- Docker

## Installation

### Requirements

- Docker and Docker Compose
- Node.js (for frontend development)
- .NET SDK (for backend development)

### Development Environment Setup

1. Clone the project:

```bash
git clone [repository-url]
cd warehouse-app
```

2. Start the application with Docker:

```bash
docker-compose up
```

### Frontend Development

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

### Backend Development

Navigate to the backend directory and build the project:

```bash
cd backend
dotnet build
```

## Running with Docker

To run the entire application with Docker:

```bash
docker-compose up
```

This command will start both frontend and backend services.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
