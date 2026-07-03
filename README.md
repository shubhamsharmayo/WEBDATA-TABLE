# WebData Table Application

A comprehensive web application for managing, comparing, and processing tabular data from CSV files. The application consists of multiple interconnected components including a React frontend, Node.js/Express backend, Electron desktop client, and additional utility tools.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
- [Frontend Usage](#frontend-usage)
- [Backend Services](#backend-services)
- [Electron Desktop Client](#electron-desktop-client)
- [Deployment](#deployment)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

WebData Table is a full-stack application designed to facilitate data workflows involving CSV files. Key capabilities include:

- Upload and manage CSV data files
- Create and use data templates for consistent formatting
- Compare CSV files to identify differences
- Merge multiple CSV files into consolidated outputs
- User authentication and role-based access control
- Database persistence for storing processed data and metadata
- Export results in various formats
- Desktop application via Electron for offline usage

## Architecture

The application follows a multi-tier architecture:

```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────────┐
│   React Frontend│    │Node.js/Express   │    │   Electron Client  │
│  (WEB_DATA_     │◄──►│   Backend API    │◄──►│  (webdata_electron)│
│  CONVERSION__   │    │                  │    │                    │
│  FRONTEND_VERSON│    │                  │    │                    │
│  2.0)           │    │                  │    │                    │
└─────────────────┘    └──────────────────┘    └────────────────────┘
          │                           │                       │
          ▼                           ▼                       ▼
    Webdata-client              Database              System Resources
    (Vite/React)              (SQLite/MySQL)         (File System)
```

### Components

1. **Frontend Application** (`WEB_DATA_CONVERSION__FRONTEND_VERSON_2.0`)
   - Built with React and Create React App
   - Material-UI (MUI) component library
   - REST API consumption
   - File upload/download handling
   - Interactive data tables and visualization

2. **Backend API** (`WEB_DATA_CONVERSION_BACKEND_VERSION_2.0`)
   - Node.js with Express framework
   - Sequelize ORM for database operations
   - RESTful API endpoints
   - File processing utilities (CSV parsing, zip handling)
   - Authentication and authorization middleware
   - Background job processing (BullMQ)
   - Swagger/OpenAPI documentation

3. **Electron Desktop Client** (`webdata_electron`)
   - Cross-platform desktop application
   - Bundles frontend and backend
   - Local database storage
   - Offline capabilities

4. **Utility Client** (`Webdata-client`)
   - Vite-powered React application
   - Alternative frontend interface
   - Tailwind CSS for styling

## Features

### Data Management
- **CSV Upload**: Support for single and batch CSV file uploads
- **Template System**: Create reusable templates for data structure mapping
- **Data Validation**: Validate uploaded data against templates
- **Data Transformation**: Map and transform data fields according to templates

### Comparison & Analysis
- **CSV Comparison**: Side-by-side comparison of two CSV files
- **Difference Highlighting**: Visual highlighting of additions, deletions, and modifications
- **Aggregated Error Reporting**: Summary statistics of comparison results
- **Export Options**: Export comparison results in various formats

### User Management
- **&colon;** Different permission levels for users (Admin, Data Entry, etc.)
- **Authentication:** Secure login/logout with JWT tokens
- **Session Management:** Persistent user sessions
- **Role-Based Access Control:** Fine-grained permissions for different modules

### File Operations
- **Merge CSV:** Combine multiple CSV files based on common keys
- **File Storage:** Organized storage of uploaded and processed files
- **Backup & Restore:** Database backup functionality
- **Bulk Operations:** Process multiple files simultaneously

## Technology Stack

### Frontend
- **React** 18.x (Create React App/Vite)
- **Material-UI** (MUI) Component Library
- **Axios** for HTTP requests
- **React Router** for navigation
- **Redux/Zustand** for state management
- **HTML5/CSS3/JavaScript ES6+**

### Backend
- **Node.js** 16.x+
- **Express.js** Web Framework
- **Sequelize** ORM (Supports SQLite, MySQL, PostgreSQL)
- **JSON Web Tokens** (JWT) for Authentication
- **Bcryptjs** for Password Hashing
- **Multer** for File Upload Handling
- **CORS** Middleware
- **Body-parser** for Request Parsing
- **BullMQ** for Background Job Processing
- **Swagger/OpenAPI** for API Documentation
- **Dotenv** for Environment Configuration

### Database
- **SQLite** (Default development database)
- **MySQL** (Production-ready option)
- **Sequelize** Models for:
  - Users and Authentication
  - Templates and Metadata
  - Files and Uploaded Data
  - Comparison Results
  - Error Tracking
  - Data Mappings

### DevOps & Tools
- **Git** for Version Control
- **NPM/Yarn** for Package Management
- **Dotenv** for Environment Variables
- **Nodemon** for Development Server
- **PM2** for Production Process Management
- **Electron** for Desktop Packaging
- **Forge** for Electron Build Configuration

## Project Structure

```
WEBDATA-TABLE/
├── README.md                     # This file
├── WEBDATA-TABLE_Documentation.docx # Existing documentation (Word format)
├── WEB_DATA_CONVERSION_BACKEND_VERSION_2.0/  # Backend Node.js/Express API
├── WEB_DATA_CONVERSION__FRONTEND_VERSON_2.0/ # Frontend React (CRA) application
├── Webdata-client/               # Alternative frontend (Vite/React)
├── webdata_electron/             # Electron desktop client
└── .git/                         # Git repository
```

### Backend Structure (`WEB_DATA_CONVERSION_BACKEND_VERSION_2.0/`)
```
├── src/                          # Source code
│   ├── controllers/              # Request handlers
│   │   └── resultGeneration/     # CSV processing controllers
│   ├── middleware/               # Custom middleware (auth, validation)
│   ├── models/                   # Database models (Sequelize)
│   │   ├── TempleteModel/        # Template-related models
│   │   ├── CompareModel/         # Comparison-related models
│   │   └── User.js               # User model
│   ├── routes/                   # API route definitions
│   ├── services/                 # Business logic services
│   ├── utils/                    # Utility functions
│   ├── swagger.js                # Swagger/OpenAPI configuration
│   ├── server.js                 # Main application entry point
│   ├── .env                      # Environment variables
│   ├── package.json              # Dependencies and scripts
│   └── Startserver.bat/Stopserver.bat # Server control scripts
```

### Frontend Structure (`WEB_DATA_CONVERSION__FRONTEND_VERSON_2.0/`)
```
├── src/
│   ├── components/               # Reusable UI components
│   ├── pages/                    # Page components
│   ├── services/                 # API service layers
│   ├── Store/                    # State management
│   ├── UI/                       # UI-specific components
│   ├── assets/                   # Static assets (images, icons)
│   ├── App.js                    # Main application component
│   ├── index.js                  # Entry point
│   └── package.json              # Dependencies and scripts
```

## Setup and Installation

### Prerequisites
- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 1.x
- **Git** (for cloning the repository)
- **Database** (SQLite is included, MySQL optional for production)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd WEBDATA-TABLE
   ```

2. Install backend dependencies:
   ```bash
   cd WEB_DATA_CONVERSION_BACKEND_VERSION_2.0
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env  # If example exists
   # Or create .env manually:
   # PORT=5000
   # DB_TYPE=sqlite
   # DB_NAME=webdata.db
   # JWT_SECRET=your-secret-key
   ```

4. Initialize the database:
   ```bash
   # The database is initialized automatically on first server start
   # For manual initialization:
   node utils/createDb.js
   ```

5. Start the development server:
   ```bash
   npm run start
   # Or with nodemon for auto-reload:
   npm run dev
   ```

### Frontend Setup

1. Install frontend dependencies:
   ```bash
   cd WEB_DATA_CONVERSION__FRONTEND_VERSON_2.0
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   # Application will be available at http://localhost:3000
   ```

### Alternative Frontend (Vite)

```bash
cd Webdata-client
npm install
npm run dev
# Application will be available at http://localhost:5173
```

### Electron Desktop Client

```bash
cd webdata_electron
npm install
npm run start  # Or npm run make for packaging
```

## Environment Configuration

### Backend Environment Variables (`.env`)
```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_TYPE=sqlite  # Options: sqlite, mysql, postgres
DB_HOST=localhost
DB_PORT=3306
DB_NAME=webdata
DB_USERNAME=root
DB_PASSWORD=

# JWT Authentication
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=24h

# File Upload Settings
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_DIR=./uploads
ALLOWED_EXTENSIONS=.csv,.zip

# Email Configuration (if applicable)
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=user@example.com
EMAIL_PASS=password
EMAIL_FROM=noreply@example.com

# Background Processing
REDIS_HOST=localhost
REDIS_PORT=6379
```

### Environment-Specific Notes
- **Development**: Use SQLite for simplicity
- **Production**: Consider MySQL or PostgreSQL for better scalability
- **Security**: Always change JWT_SECRET in production
- **File Limits**: Adjust MAX_FILE_SIZE based on expected file sizes

## API Documentation

The backend provides a RESTful API with automatic Swagger documentation.

### Accessing API Docs
Once the backend server is running, visit:
```
http://localhost:5000/api-docs
```

### Main API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get current user profile

#### User Management
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

#### Template Management
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create new template
- `GET /api/templates/:id` - Get template by ID
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template
- `GET /api/templates/:id/metadata` - Get template metadata

#### File Operations
- `POST /api/upload/key` - Upload key/template CSV file
- `POST /api/upload/data` - Upload data CSV file
- `GET /api/files` - Get list of uploaded files
- `GET /api/files/:id` - Get file details
- `DELETE /api/files/:id` - Delete file

#### Comparison Operations
- `POST /api/compare` - Compare two CSV files
- `GET /api/compare/:id` - Get comparison results
- `GET /api/compare/:id/errors` - Get detailed errors
- `GET /api/compare/:id/aggregated` - Get aggregated error statistics
- `DELETE /api/compare/:id` - Delete comparison result

#### Merge Operations
- `POST /api/merge` - Merge multiple CSV files
- `GET /api/merge/:id` - Get merge results
- `GET /api/merge/:id/download` - Download merged CSV

#### Settings
- `GET /api/settings` - Get application settings
- `PUT /api/settings` - Update application settings

### Request/Response Format
All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object|array|null,
  "error": object|null
}
```

Error responses include appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Usage

### Navigation
The frontend application features a sidebar navigation with the following sections:
- **Dashboard**: Overview of recent activities and statistics
- **Templates**: Manage data templates
- **Upload**: Upload CSV files for processing
- **Compare**: Compare two CSV files
- **Merge**: Merge multiple CSV files
- **History**: View past operations
- **Users**: User management (Admin only)
- **Settings**: Application configuration

### Common Workflows

#### Creating a Template
1. Navigate to Templates section
2. Click "Create New Template"
3. Define template name and description
4. Add fields with:
   - Field name
   - Data type (text, number, date, etc.)
   - Validation rules (required, min/max length, pattern)
   - Default values
5. Save template

#### Uploading and Processing Data
1. Navigate to Upload section
2. Select either "Key File" (template) or "Data File"
3. Choose CSV file from local system
4. Optionally map columns to template fields
5. Submit for processing
6. Monitor processing status
7. View results or download processed file

#### Comparing CSV Files
1. Navigate to Compare section
2. Upload first CSV file (base/file A)
3. Upload second CSV file (comparison/file B)
4. Select key columns for comparison
5. Choose comparison type (exact match, fuzzy match, etc.)
6. Start comparison process
7. Review side-by-side differences
8. Export results if needed

#### Merging CSV Files
1. Navigate to Merge section
2. Upload multiple CSV files
3. Select common key column(s) for merging
4. Choose merge strategy (inner join, left outer, etc.)
5. Configure output fields
6. Start merge process
7. Download merged result

## Backend Services

### Core Services

#### Authentication Service (`services/authService.js`)
- Handles user registration, login, token generation
- Password hashing and verification
- Session management
- Role-based access control

#### File Service (`services/fileService.js`)
- File upload handling with Multer
- CSV parsing and validation
- File storage and retrieval
- File metadata management

#### Template Service (`services/templateService.js`)
- Template CRUD operations
- Metadata association with templates
- Template validation rules
- Field mapping management

#### Comparison Service (`services/comparisonService.js`)
- CSV comparison algorithms
- Difference detection and highlighting
- Error aggregation and statistics
- Result formatting and export

#### Merge Service (`services/mergeService.js`)
- CSV merging algorithms
- Join operations (inner, outer, left, right)
- Conflict resolution strategies
- Output formatting

#### User Service (`services/userService.js`)
- User profile management
- Permission handling
- Role assignment
- User activity tracking

### Middleware

#### Authentication Middleware (`middleware/authMiddleware.js`)
- JWT token verification
- Route protection
- Role-based access enforcement
- Request user injection

#### Validation Middleware (`middleware/validationMiddleware.js`)
- Request data validation
- Input sanitization
- Custom validation rules

#### Error Handling Middleware (`middleware/errorMiddleware.js`)
- Centralized error handling
- Consistent error response formatting
- Logging and monitoring integration

## Database Schema

### Core Tables

#### Users
```sql
CREATE TABLE Users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userName VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('Admin', 'DataEntry', 'Viewer') DEFAULT 'DataEntry',
  mobile VARCHAR(20),
  permissions JSON,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Templates
```sql
CREATE TABLE Templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdBy INTEGER REFERENCES Users(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Template Metadata
```sql
CREATE TABLE TemplateMetadata (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  templateId INTEGER REFERENCES Templates(id) ON DELETE CASCADE,
  attribute VARCHAR(255) NOT NULL,
  value TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Files
```sql
CREATE TABLE Files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  templateId INTEGER REFERENCES Templates(id) ON DELETE CASCADE,
  fileName VARCHAR(255) NOT NULL,
  filePath VARCHAR(512) NOT NULL,
  fileSize INTEGER,
  mimeType VARCHAR(100),
  uploadedBy INTEGER REFERENCES Users(id),
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Comparison Results
```sql
CREATE TABLE ComparisonResults (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fileAId INTEGER REFERENCES Files(id),
  fileBId INTEGER REFERENCES Files(id),
  comparedBy INTEGER REFERENCES Users(id),
  result JSON, -- Detailed comparison results
  status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Error Tracking
```sql
CREATE TABLE ErrorTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  comparisonId INTEGER REFERENCES ComparisonResults(id),
  rowNumber INTEGER,
  columnName VARCHAR(255),
  errorType VARCHAR(100),
  errorMessage TEXT,
  valueA TEXT,
  valueB TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ErrorAggregatedTable (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  errorTableId INTEGER REFERENCES ErrorTable(id),
  errorType VARCHAR(100) NOT NULL,
  count INTEGER DEFAULT 1,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Development Deployment
1. Start backend: `npm run start` in backend directory
2. Start frontend: `npm start` in frontend directory
3. Access application at `http://localhost:3000`

### Production Deployment

#### Backend Production
```bash
# Install production dependencies
npm install --production

# Set production environment
NODE_ENV=production

# Start with process manager
npm install -g pm2
pm2 start server.js --name webdata-backend
pm2 save
pm2 startup
```

#### Frontend Production
```bash
# Build for production
npm run build

# Serve with production web server (nginx, apache, etc.)
# Build output is in /build directory
```

#### Docker Deployment
```dockerfile
# Backend Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Frontend Dockerfile
FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Electron Desktop Distribution
```bash
# Package for different platforms
npm run make  # Creates distributable packages in /out directory

# Available targets:
# - make: win32/x64 installer
# - make: darwin/x64 package
# - make: linux/x64 AppImage
```

## Configuration and Customization

### Backend Configuration
Modify `src/config/` files for:
- Database connection pools
- File upload limits
- Rate limiting settings
- CORS origins
- Session timeout values

### Frontend Theming
The frontend uses Material-UI theming:
- Modify `src/theme.js` for custom colors
- Adjust spacing, typography, and component styles
- Create custom component variants

### Feature Flags
Feature flags can be implemented in:
- Backend: `src/config/featureFlags.js`
- Frontend: `src/config/features.js`

## Testing

### Backend Tests
```bash
# Run unit tests
npm test

# Run specific test suites
npm test -- --testPathPattern=controllers
npm test -- --testPathPattern=services

# Generate coverage report
npm run test:coverage
```

### Frontend Tests
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm run test:coverage
```

### End-to-End Tests
Cypress tests are located in:
- Backend: `cypress/integration/backend/`
- Frontend: `cypress/integration/frontend/`

```bash
# Run E2E tests
npm run cypress:open
```

## Monitoring and Logging

### Logging
The application uses Winston for logging:
- Log levels: error, warn, info, http, debug
- Log files: `logs/error.log`, `logs/combined.log`
- Request logging middleware
- Custom log formats

### Monitoring
- Health check endpoint: `GET /health`
- Metrics endpoint: `GET /metrics` (Prometheus format)
- Performance monitoring
- Error tracking (Sentry integration available)

### Health Checks
```bash
# Check application health
curl http://localhost:5000/health
# Returns: {"status":"OK","timestamp":"...","version":"2.1.0"}
```

## Troubleshooting

### Common Issues

#### Database Connection Errors
- **Symptoms**: Server fails to start, database connection errors
- **Solutions**:
  1. Verify `.env` database configuration
  2. Ensure database service is running
  3. Check database credentials
  4. For SQLite: verify file permissions on database file

#### File Upload Failures
- **Symptoms**: Uploads fail with size or type errors
- **Solutions**:
  1. Check `MAX_FILE_SIZE` in `.env`
  2. Verify `ALLOWED_EXTENSIONS` includes required types
  3. Check server directory write permissions
  4. Review upload directory space availability

#### Authentication Problems
- **Symptoms**: Login fails, token validation errors
- **Solutions**:
  1. Verify `JWT_SECRET` in `.env`
  2. Check system clock synchronization
  3. Clear browser cookies/localStorage and retry
  4. Verify user exists in database with correct password

#### Performance Issues
- **Symptoms**: Slow response times, high memory usage
- **Solutions**:
  1. Check database query performance
  2. Review file processing algorithms for large files
  3. Monitor memory usage with `node --inspect`
  4. Consider adding database indexes
  5. Enable caching for frequent operations

### Debugging
Enable debug logs by setting:
```bash
# Backend
DEBUG=webdata:* npm start

# Frontend
REACT_APP_LOG_LEVEL=debug npm start
```

## Contributing

### Code Style
- **JavaScript**: Follow ESLint configuration (`.eslintrc.js`)
- **Commits**: Use conventional commits format
- **PRs**: Keep pull requests focused and well-documented

### Contribution Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes and commit: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request
6. Ensure CI passes
7. Request review from maintainers

### Development Guidelines
- Write unit tests for new functionality
- Update documentation for API changes
- Follow existing code patterns and conventions
- Keep dependencies up-to-date
- Perform security reviews for new features

### Reporting Issues
When reporting bugs, please include:
- Environment details (OS, Node.js version, browser)
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or screen recordings if applicable
- Relevant logs from backend/frontend

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Create React App team for the excellent frontend bootstrap
- Express.js team for the robust backend framework
- Material-UI/MUI for the beautiful component library
- Sequelize team for the powerful ORM
- Electron team for enabling cross-platform desktop apps
- All contributors and users who have helped improve this application

---

**Version**: 2.1.0  
**Last Updated**: July 2026  
**Maintained by**: WebData Table Development Team

For questions or support, please open an issue in the repository or contact the maintainers directly.