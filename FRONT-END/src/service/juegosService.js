import axiosClient from "./axiosClient";

// Funcion get all
export const getJuegos = async () => {
    try {
        const response = await axiosClient.get("/juegos");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Funcion create
export const createJuego = async (juego) => {
    try {
        const response = await axiosClient.post("/juegos", juego);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Funcion put
export const updateJuego = async (id, juego) => {
    try {
        const response = await axiosClient.put(`/juegos/${id}`, juego);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Funcion delete
export const deleteJuego = async (id) => {
    try {
        const response = await axiosClient.delete(`/juegos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
