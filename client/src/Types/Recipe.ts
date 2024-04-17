import {AxiosResponse} from "axios";
import BakeryClient from "@/Utils/Axios.ts";

export const getAllRecipes = async () => {
    try {
        const response: AxiosResponse = await BakeryClient.get('/recipes', {withCredentials: true});
        return response.data;
    } catch (error) {
        // Handle error
        throw error;
    }
};