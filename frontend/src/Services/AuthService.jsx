// services/authService.js
import api from '../utils/api';


export const authService = {
    // Registration
    register: async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Login
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Logout
    logout: async () => {
        try {
            const response = await api.post('/logout');
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Get all users
    getAllUsers: async () => {
        try {
            const response = await api.get('/');
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Get user by ID
    getUserById: async (userId) => {
        try {
            const response = await api.get(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Update user
    updateUser: async (userId, userData) => {
        try {
            const response = await api.put(`/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/${userId}`);
            return response.data;
        } catch (error) {
            throw error?.response?.data || error;
        }
    }
};
