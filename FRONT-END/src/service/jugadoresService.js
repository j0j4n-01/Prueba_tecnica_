import axiosClient from "./axiosClient";

// Funcion get all
export const getJugadores = async () => {
    try {
        const response = await axiosClient.get("/jugadores");
        return response.data; 
    } catch (error) {
        throw error; 
    }
};

// Funcion create
export const createJugador = async (jugador) => {
    try {
        const response = await axiosClient.post("/jugadores", jugador);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Funcion put
export const updateJugador = async (id, jugador) => {
    try {
        const response = await axiosClient.put(`/jugadores/${id}`, jugador);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Funcion delete
export const deleteJugador = async (id) => {
    try {
        const response = await axiosClient.delete(`/jugadores/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
