import api from "@/core/config/api"

export const GetInfoTrainee = async () => {
    try {
        const res = await api.get("Trainee/GetInfo")
        return res.data
    } catch (err) {
        console.error("Failed to fetch Trainee/GetRealInfo:", err);
        throw err
    }
}

export const RegistrationTrainee = async (data: any) => {
    try {
        const res = await api.post("Trainee/Registration", data)
        return res.data
    } catch (err: any) {
        console.error("Failed to post Trainee/Registration:", {
            status: err?.response?.status,
            data: err?.response?.data,
            message: err?.message,
        });
        throw err
    }
}