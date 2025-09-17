import axios from "axios"
import { Configs } from "@/contants"

const apiInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
})

export default apiInstance