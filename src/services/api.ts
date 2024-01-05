import axios from 'axios'
import { AppError } from '../util/AppError';

const api = axios.create({
    baseURL: 'http://192.168.0.32:3333',
})

api.interceptors.request.use((config) => {
    // Retorna config após exibir dados
    return config
    

}, (error) => {
    return Promise.reject(error)
})


//RESPONSE
api.interceptors.response.use(response => response , error => {
    if(error.response &&  error.response.data){
        return Promise.reject(new AppError(error.response.data.message));
    }else{
        return Promise.reject(new AppError('Erro de conexão com o servidor! Tente novamente mais tarde.'))
    }
}  )

export { api }

