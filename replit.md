# QR-Code Watermark Application

## Overview

This is a personal steganography application with MVPBlocks-inspired design that allows users to embed and extract encrypted data invisibly in PNG images using LSB (Least Significant Bit) insertion techniques. The application features beautiful glass morphism effects, smooth animations, and a dark gradient theme. Built as a proof-of-concept for invisible data transmission.

## User Preferences

Preferred communication style: Simple, everyday language.
Design preference: MVPBlocks aesthetic with beautiful animations and glass morphism effects.
Project scope: Personal project focused on core steganography features only - no SaaS elements.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth UI animations

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: connect-pg-simple for PostgreSQL-backed sessions
- **Development**: Hot reload with Vite middleware integration

### Build and Development
- **Monorepo Structure**: Shared code between client and server
- **Development Server**: Vite dev server with Express API integration
- **Production Build**: Separate client (Vite) and server (esbuild) builds
- **TypeScript**: Strict mode enabled with path mapping for clean imports

## Key Components

### Steganography Engine
- **LSB Insertion**: Embeds data in PNG alpha channels using least significant bit manipulation
- **Encryption**: AES-GCM encryption with Web Crypto API for payload security
- **Password Derivation**: PBKDF2 for secure key generation from user passwords
- **Capacity Checking**: Validates image size against payload requirements

### QR Code Integration
- **Scanner**: WebAssembly-based QR code detection (simulated for now)
- **Generator**: Creates QR codes for easy data sharing
- **Camera Access**: Progressive Web App features for mobile scanning

### UI Components
- **File Upload**: Drag-and-drop zones with PNG validation
- **Progress Tracking**: Real-time progress bars for processing operations
- **Result Display**: Downloadable results with status indicators
- **Responsive Design**: Mobile-first approach with glass morphism effects

### Database Schema
- **Users Table**: Basic user management structure (currently using in-memory storage)
- **Extensible**: Drizzle ORM setup allows easy schema evolution
- **Migration Support**: Built-in migration system for schema changes

## Data Flow

### Embed Process
1. User uploads PNG image and enters payload text
2. Frontend validates file type and size constraints
3. Payload is encrypted using Web Crypto API
4. Encrypted data is embedded in image using LSB steganography
5. Modified image is returned as downloadable blob

### Extract Process
1. User uploads watermarked PNG image
2. LSB extraction algorithm reads hidden data from alpha channel
3. Encrypted payload is decrypted using stored/provided key
4. Original message is displayed to user

### QR Code Workflow
1. Generated QR codes contain references to watermarked images
2. Scanner detects QR codes and extracts image references
3. Images are processed through standard extraction pipeline

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI component primitives
- **framer-motion**: Animation library for smooth interactions

### Development Tools
- **@replit/vite-plugin-runtime-error-modal**: Error handling for Replit environment
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **tsx**: TypeScript execution for development server

### Security and Crypto
- **Web Crypto API**: Native browser cryptography
- **connect-pg-simple**: Secure session management
- **zod**: Runtime type validation and schema parsing

## Deployment Strategy

### Development
- **Local Development**: Vite dev server with Express API proxy
- **Hot Reload**: Full-stack hot reload with Vite middleware
- **Error Handling**: Runtime error overlay for debugging
- **Environment**: NODE_ENV-based configuration switching

### Production
- **Build Process**: Separate client and server builds
- **Client Build**: Vite builds optimized React bundle to `dist/public`
- **Server Build**: esbuild creates Node.js bundle in `dist/`
- **Static Assets**: Client serves from built assets directory
- **Database**: PostgreSQL with connection pooling via Neon

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Push Command**: `db:push` for development schema updates
- **Connection**: Environment-based DATABASE_URL configuration
- **Backup Strategy**: Relies on Neon's built-in backup capabilities

### Session and Security
- **Session Storage**: PostgreSQL-backed sessions for scalability
- **CORS**: Configured for cross-origin requests in development
- **Environment Variables**: Secure configuration management
- **Error Handling**: Centralized error middleware with proper status codes