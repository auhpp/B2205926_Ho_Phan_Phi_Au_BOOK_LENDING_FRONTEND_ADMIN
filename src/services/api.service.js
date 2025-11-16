import axios from "axios";
import router from "@/router";

const commonConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
};

export default (baseURL) => {
    const api = axios.create({
        baseURL,
        ...commonConfig,
    });


    api.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            return response;
        },

        async (error) => {
            const { status } = error.response || {};

            if (status === 401 || status === 403) {
                localStorage.removeItem("access_token");
                await router.replace({ name: 'signin' });


            }

            return Promise.reject(error);
        }
    );

    return api;
};