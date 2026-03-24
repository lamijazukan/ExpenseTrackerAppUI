import api from "./apiClient";
import { UserProfile } from "../types/userprofile-types";

export const getUserProfile = async (): Promise<UserProfile> => {
    
    const response = await api.get<UserProfile>("/userprofile");
   
    return response.data;
};