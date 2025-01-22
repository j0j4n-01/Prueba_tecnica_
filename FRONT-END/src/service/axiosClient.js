import axios from "axios";

console.log(import.meta.env.VITE_API_BASE_URL);

// Usar la variable de entorno en el cliente de axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // Asegúrate de que la variable de entorno esté bien configurada
});

// Manejar errores
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error en la respuesta de la API:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
