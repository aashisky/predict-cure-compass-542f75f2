# Architecture Documentation

## Project Overview
This project, Predict Cure Compass, aims to provide an AI-driven platform for predicting health outcomes and recommending personalized treatment plans.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Deployment:** AWS

## Directory Structure
```
/predict-cure-compass
|-- /client     # Frontend code
|-- /server     # Backend code
|-- /docs       # Documentation
|-- package.json
|-- README.md
```

## Component Architecture
- **Client:**
  - Components: Header, Sidebar, Dashboard, TreatmentRecommendation
- **Server:**
  - Routes: Users, Predictions, Treatments

## Data Flow
1. User interacts with the frontend components.
2. Frontend sends requests to the backend API.
3. Backend processes requests, interacts with the database, and sends responses back to the frontend.

## Component Dependencies
- **Frontend:**
  - React Router for routing
  - Axios for HTTP requests
- **Backend:**
  - Mongoose for MongoDB interaction
  - JWT for authentication
