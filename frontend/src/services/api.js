import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await axios.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get products by category
    getProductsByCategory: async (category) => {
        try {
            const response = await axios.get(`${API_URL}/products/category/${category}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single product
    getProduct: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Add new product
    addProduct: async (productData) => {
        try {
            const response = await axios.post(`${API_URL}/products`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update product
    updateProduct: async (id, productData) => {
        try {
            const response = await axios.put(`${API_URL}/products/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete product
    deleteProduct: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/products/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default api;