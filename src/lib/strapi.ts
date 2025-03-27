
import axios from 'axios';
import qs from 'qs';

// Strapi API URLs - Update with your actual Strapi URL
export const STRAPI_URL = 'https://strapi.glowgridmedia.com'; // Replace with your actual URL
export const STRAPI_API_URL = `${STRAPI_URL}/api`;

// Strapi API client
export const strapiClient = axios.create({
  baseURL: STRAPI_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to handle Strapi API errors
export const handleStrapiError = (error: any): Error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error("Strapi API error:", error.response.data);
    return new Error(`API Error: ${error.response.data.error?.message || 'Unknown error'}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error("No response from Strapi:", error.request);
    return new Error('No response from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error("Error setting up request:", error.message);
    return new Error(`Request Error: ${error.message}`);
  }
};

// Function to build Strapi query URL with parameters
export const getStrapiURL = (path = '') => {
  return `${STRAPI_API_URL}${path}`;
};

// Helper to build query parameters for Strapi
export const buildStrapiQuery = (params: any) => {
  return qs.stringify(params, {
    encodeValuesOnly: true,
  });
};

// Authentication
export const authStrapi = async (identifier: string, password: string) => {
  try {
    const response = await strapiClient.post('/auth/local', {
      identifier,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw handleStrapiError(error);
  }
};

// Register user
export const registerStrapiUser = async (username: string, email: string, password: string) => {
  try {
    const response = await strapiClient.post('/auth/local/register', {
      username,
      email,
      password,
    });
    
    return response.data;
  } catch (error) {
    throw handleStrapiError(error);
  }
};

// Set JWT token for authenticated requests
export const setStrapiToken = (token: string | null) => {
  if (token) {
    strapiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete strapiClient.defaults.headers.common['Authorization'];
  }
};

// Clear JWT token
export const clearStrapiToken = () => {
  delete strapiClient.defaults.headers.common['Authorization'];
};
