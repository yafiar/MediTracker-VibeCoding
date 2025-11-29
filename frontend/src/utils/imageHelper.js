// Helper to get the correct backend URL for images
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://meditracker-backend-c0fn.onrender.com/api';
// Remove /api from the end to get the base server URL
const SERVER_BASE_URL = API_BASE_URL.replace(/\/api$/, '');

/**
 * Converts a relative image path to a full URL using the deployed backend
 * @param {string} imagePath - The image path from the database (e.g., /uploads/userId/filename.jpg)
 * @returns {string} Full URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Ensure path starts with /
  const path = imagePath.startsWith('/') ? imagePath : '/' + imagePath;
  
  // Combine with server base URL
  return `${SERVER_BASE_URL}${path}`;
};
