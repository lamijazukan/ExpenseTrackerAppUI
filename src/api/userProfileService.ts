import api from "./apiClient";

interface UserProfile {
    username: string;
    email: string;
    language: string;
    currency: string;
    avatarUrl: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
    
    const response = await api.get("/userprofile");
   
    return response.data;
};