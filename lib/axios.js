import axios from "axios"

const apiInstance = axios.create({
    baseURL: import.meta.env.MODE=== "DEVELOPMENT" ? "https://vedalink-sih25.vercel.app/api" : "/api",
    withCredentials: true,
})

export default apiInstance