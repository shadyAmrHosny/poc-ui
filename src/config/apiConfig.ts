
/**
 * API Configuration
 * 
 * This file contains configuration for API endpoints.
 * Update these values to point to your actual API services.
 */

export const apiConfig = {
  // The base URL for your API services
  baseUrl:  import.meta.env.VITE_BASE_URL ||'https://your-api-endpoint.com',
  
  // Specific endpoint paths
  endpoints: {
    //pitstopPredictor: '/predict', // Replace with your actual endpoint
    pitstopPredictor: '/test'
  },
  
  // API timeout in milliseconds (30 seconds)
  timeout: 30000,
  
  // Whether to use mock data instead of actual API calls (for development)
  useMockData: true,
};
