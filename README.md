# Pitstop Predictor UI

This repository contains the front-end application for the **Pitstop Predictor**, a tool that predicts optimal pit stop timing in motorsports using AI analysis. The application is built with **React**, **TypeScript**, and **Tailwind CSS**.

## Features
- User-friendly form to input race parameters
- AI-powered prediction for optimal pit stops
- Confidence score for predictions
- Explanation of AI analysis
- Responsive and modern UI

## Technologies Used
- **React** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for state management
- **ShadCN/UI** for UI components

## Project Structure
```
📂 poc-ui
 ├── 📂 src
 │   ├── 📂 components  # Reusable UI components
 │   ├── 📂 pages       # Application pages (Index, NotFound, etc.)
 │   ├── 📂 config      # API configurations
 │   ├── 📂 services    # API interaction services
 │   ├── App.tsx       # Main app component
 │   ├── main.tsx      # Entry point
 │   ├── index.css     # Global styles
 ├── Dockerfile        # Docker setup for deployment
 ├── package.json      # Project dependencies
 ├── README.md         # Project documentation
```

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/shadyAmrHosny/poc-ui.git
   cd poc-ui
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running Locally
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and visit `http://localhost:5173`

## Environment Variables
Create a `.env` file and configure your API base URL:
```
VITE_BASE_URL=https://your-api-endpoint.com
```

## Docker Deployment
To containerize the application, use the provided `Dockerfile`:

### Build the Docker Image
```sh
docker build -t pitstop-ui .
```

### Run the Container
```sh
docker run -p 8080:80 -e VITE_BASE_URL=https://your-api-endpoint.com pitstop-ui
```

## Deployment on Google Cloud Run
1. Authenticate with GCP:
   ```sh
   gcloud auth login
   gcloud auth configure-docker
   ```
2. Build and push the Docker image:
   ```sh
   gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/pitstop-ui
   ```
3. Deploy to Cloud Run:
   ```sh
   gcloud run deploy pitstop-ui --image gcr.io/YOUR_PROJECT_ID/pitstop-ui --platform managed --allow-unauthenticated
   ```

## License
This project is licensed under the MIT License.

---
For contributions, open an issue or submit a pull request!

