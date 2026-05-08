import {sharedApi} from "../index.jsx";

const baseUrl = "v1/product";

export const ProductService = {
    async getAll() {
        try {
            const response = await sharedApi.get(baseUrl);
            return response.data;
        } catch (error) {
            console.error("[ProductService] getAll error:", error);
            throw error;
        }
    },

};
