import {api} from "../index.jsx"

const baseUrl = "v1/barber"

export const BarberService = {
    async getAll() {
        try {
            const response = await api.get(`${baseUrl}/all-barbers`)
            return response.data.data
        } catch (error) {
            console.error("[BarberService] getAll error:", error)
            throw error
        }
    },

    async verifyBarber() {
        try {
            const response = await api.get(`${baseUrl}/verify-barber`)
            return response.data
        } catch (error) {
            console.error("[BarberService] verifyBarber error:", error)
            throw error
        }
    },

    async createBarber(payload) {
        try {
            const response = await api.post(baseUrl, {
                publicId: payload.publicId,
                userId: payload.userId,
            });

            if (!response.data.success) {
                throw new Error(response.data.message || "Failed to create barber")
            }

            return response.data;
        } catch (error) {
            console.error("[BarberService] createBarber error:", error)
            throw error;
        }
    },

    async updateBarber(payload) {
        try {
            const response = await api.post(`${baseUrl}/update`, payload)
            return response.data
        } catch (error) {
            console.error("[BarberService] updateBarber error:", error)
            throw error
        }
    },

    async deleteBarber(payload) {
        try {

            if (!payload?.publicId) {
                throw new Error("ID do barbeiro não fornecido")
            }

            const response = await api.post(`${baseUrl}/delete`, {
                publicId: payload.publicId
            })

            if (!response.data?.success) {
                throw new Error(response.data?.message || "Falha na resposta do servidor")
            }

            return response.data
        } catch (error) {
            console.error("[BarberService] Erro detalhado:", {
                error: error.response?.data || error.message,
                status: error.response?.status,
                payload
            })
            throw error
        }
    }
}
