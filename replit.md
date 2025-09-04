# Dog Years Calculator

## Overview

A scientifically accurate dog age calculator web application that converts a dog's age to human years. The application features an interactive calculator with multiple input methods, educational content about dog aging, testimonials, and articles about canine health and longevity. Built as a modern single-page application with a warm, pet-friendly design theme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Single-page application using React 18 with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing with support for nested routes
- **UI Framework**: Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a warm orange/neutral color palette
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Storage Layer**: In-memory storage implementation with interface abstraction for future database integration
- **API Design**: RESTful API structure with `/api` prefix routing
- **Development**: Hot module replacement and live reloading via Vite integration

### Data Storage Solutions
- **Current**: In-memory storage using Map data structures for user management
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definitions and migrations
- **Provider**: Neon Database serverless PostgreSQL integration configured
- **Schema**: User entity with username/password fields, UUID primary keys

### Authentication and Authorization
- **Foundation**: Basic user entity structure in place with hashed password storage capability
- **Session Management**: PostgreSQL session storage configured via connect-pg-simple
- **Security**: Prepared for secure authentication implementation with proper password hashing

### External Dependencies
- **Database**: Neon Database (PostgreSQL) for production data persistence
- **UI Components**: Radix UI primitives for accessible form controls, dialogs, and interactive elements
- **Styling**: Google Fonts integration for typography (DM Sans, Geist Mono, Architects Daughter)
- **Development**: Replit-specific tooling for development environment integration
- **Image Assets**: Unsplash for stock photography in testimonials and articles