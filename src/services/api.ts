import axios, { AxiosInstance } from 'axios'
import { AppError } from '../util/AppError';

type SignOut = () => void

type APIIInstanceProps = AxiosInstance & {
    registerIntercepteTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
    baseURL: 'http://192.168.0.32:3333',
}) as APIIInstanceProps;

api.registerIntercepteTokenManager = signOut => {
    const intercepteTokenManager = api.interceptors.request.use((config) => {
        // Retorna config após exibir dados
        return config

    }, (error) => {
        return Promise.reject(error)
    });

    return () => {
        api.interceptors.response.eject(intercepteTokenManager);
    }
}






//RESPONSE
api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.data) {
        return Promise.reject(new AppError(error.response.data.message));
    } else {
        return Promise.reject(new AppError('Erro de conexão com o servidor! Tente novamente mais tarde.'))
    }
})

export { api }

