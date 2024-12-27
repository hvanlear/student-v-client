# Student Journey Visualization System

## Project Documentation

### Table of Contents

1. [Project Overview](#1-project-overview)
2. [Student User Flow](#2-student-user-flow)
3. [Technical Implementation](#3-technical-implementation)
4. [Data Processing](#4-data-processing)
5. [Development & Deployment](#5-development--deployment)
6. [Future Features](#6-future-features)

---

## 1. Project Overview

### 1.1 Purpose

The Student Journey Visualization System helps students understand their academic progress by creating interactive visualizations of their degree path. Students can upload their degree audit documents and receive a clear, visual representation of their course journey, prerequisites, and completion status.

### 1.2 Core Objectives

- Provide students with clear visualization of their academic progress
- Simplify understanding of course prerequisites and relationships
- Enable better course planning and degree progression tracking
- Help identify potential scheduling conflicts or prerequisite issues
- Support different types of degree audit document formats

### 1.3 Key Features

- Interactive course relationship visualization
- Personal progress tracking
- Easy document upload
- Intuitive dark theme interface
- Course status and grade tracking
- Term/semester organization
- Prerequisites visualization

---

## 2. Student User Flow

### 2.1 Document Upload Process

1. Student accesses the system
2. Uploads degree audit document (PDF format)
3. System processes the document
4. Interactive visualization is generated
5. Student can explore and interact with their course journey

### 2.2 Visualization Features

- Course status indicators (completed, in-progress, planned, not started)
- Grade display
- Credit hour tracking
- Prerequisite relationship mapping
- Term/semester organization
- Interactive zooming and panning
- Course details on hover/click

### 2.3 Student Interactions

- View course details
- Track completion status
- Identify prerequisites
- Plan future semesters
- Export visualization
- Share progress (optional)

---

## 3. Technical Implementation

### 3.1 Frontend Components

#### Main Components

1. Document Upload

   - Drag-and-drop interface
   - File type validation
   - Upload status feedback
   - Error handling

2. Course Visualization (JourneyGraph.tsx)

   - Interactive graph display
   - Zoom and pan controls
   - Course node rendering
   - Prerequisite connections

3. Course Nodes (CourseNode.tsx)
   - Status indicators
   - Grade display
   - Credit information
   - Prerequisite indicators

### 3.2 Technology Stack

- React 18+ for UI
- TypeScript for type safety
- ReactFlow for visualization
- TailwindCSS for styling
- PDF.js for document processing
- GPT-3.5-turbo for data extraction

### 3.3 Project Structure

#### Frontend Structure

```plaintext
student-viz/
├── docs/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── adapters/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── navigation/
│   │   │   └── .gitkeep
│   │   ├── ui/
│   │   │   └── .gitkeep
│   │   └── visualization/
│   │       ├── CourseNode.tsx
│   │       └── JourneyGraph.tsx
│   ├── hooks/
│   ├── services/
│   │   ├── data/
│   │   │   └── sampleData.ts
│   │   └── layout/
│   ├── types/
│   │   └── student.ts
│   ├── utils/
│   │   └── layoutUtils.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tests/
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

#### Backend Structure

```plaintext
STUDENT-VIZ-B/
├── config/
│   ├── .env
│   ├── .env.example
│   └── .env.test
├── node_modules/
├── prisma/
│   ├── migrations/
│   ├── seeds/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── core/
│   │   ├── courses/
│   │   ├── programs/
│   │   └── progress/
│   ├── infrastructure/
│   │   ├── auth/
│   │   ├── cache/
│   │   ├── database/
│   │   └── messaging/
│   ├── interfaces/
│   │   ├── events/
│   │   ├── http/
│   │   └── jobs/
│   ├── shared/
│   │   ├── errors/
│   │   ├── logging/
│   │   └── validation/
│   └── types/
│       ├── api/
│       ├── domain/
│       └── infrastructure/
├── tests/
│   ├── e2e/
│   ├── integration/
│   └── unit/
├── app.ts
├── package.json
└── tsconfig.json
```

### 3.4 Directory Purposes

#### Frontend Key Directories

- `adapters/`: Data format conversion and external system integrations
- `components/visualization/`: Core visualization components including CourseNode and JourneyGraph
- `services/data/`: Data management and processing services
- `services/layout/`: Layout calculation and management
- `types/`: TypeScript type definitions for the application
- `utils/`: Shared utility functions and helpers

#### Backend Key Directories

- `core/`: Core business logic for courses, programs, and progress tracking
- `infrastructure/`: Technical infrastructure including auth, caching, and database
- `interfaces/`: External interface handlers (HTTP, events, jobs)
- `shared/`: Shared utilities, error handling, and validation
- `prisma/`: Database schema and migrations
- `config/`: Environment and application configuration

---

## 4. Data Processing

### 4.1 Document Processing Pipeline

1. PDF Upload

   - Client-side file validation
   - PDF text extraction
   - Initial format verification

2. AI Processing

   - Text analysis by GPT-3.5-turbo
   - Course information extraction
   - Prerequisite relationship identification
   - Status and grade parsing

3. Data Validation

   - Course information verification
   - Credit hour validation
   - Prerequisite consistency checks
   - Term/semester organization

4. Visualization Generation
   - Graph structure creation
   - Layout calculation
   - Interactive element setup

### 4.2 Data Types

```typescript
interface CourseNode {
  id: string;
  code: string;
  title: string;
  credits: number;
  prerequisites: string[];
  status: CourseStatus;
  grade?: Grade;
  term?: string;
  description?: string;
}

type CourseStatus = 'completed' | 'in-progress' | 'planned' | 'not-started';
```

---

## 5. Development & Deployment

### 5.1 Local Development

```bash
# Project setup
npm create vite@latest student-journey-viz -- --template react-ts
cd student-journey-viz

# Core dependencies
npm install @tanstack/react-query reactflow
npm install tailwindcss postcss autoprefixer
npm install pdf-parse pdfjs-dist
```

### 5.2 Testing Strategy

- Unit testing of components
- Document processing testing
- Visualization rendering tests
- User flow testing

### 5.3 Security Considerations

- Secure document handling
- Data privacy
- Rate limiting
- Error handling

---

## 6. Future Features

### 6.1 Phase 1 Enhancements

- Multiple document format support
- Advanced search capabilities
- Course filtering options
- Mobile responsiveness
- Progress sharing features

### 6.2 Phase 2: Institutional Integration

- PESC XML support
- EDI integration
- SIS compatibility
- Batch processing
- Administrative features

### 6.3 Additional Features

- Degree requirement tracking
- GPA calculator
- Course scheduling assistant
- Alternative path suggestions
- Progress notifications

---

_Note: This documentation prioritizes the student-first approach while maintaining the capability to expand into institutional features in future phases._
