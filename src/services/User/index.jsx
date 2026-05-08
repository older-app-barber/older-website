import { sharedApi } from "../index.jsx"

const baseUrl = "v1/user"

export const UserService = {
    async getAll() {
        try {
            const response = await sharedApi.get(baseUrl)
            return response.data.data
        } catch (error) {
            console.error("[UserService] getAll error:", error)
            throw error
        }
    },
}
