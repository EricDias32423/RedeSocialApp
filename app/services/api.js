import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANTE: Use o IP correto!
// Emulador Android: 10.0.2.2
// Dispositivo físico: IP do computador na rede (ex: 192.168.1.100)
const API_URL = 'http://10.0.2.2:8000/api'; // ← SÓ O ENDEREÇO BASE, SEM /register

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('@auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;