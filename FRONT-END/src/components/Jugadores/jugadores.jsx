import React from "react";
import "./Jugadores.css";

const Jugadores = ({ name }) => {
    return (
        <div className="jugador">
            <div className="jugador-name">{name}</div>
            <div className="jugador-race-track">
                <div className="jugador-bar"></div>
            </div>
        </div>
    );
};

export default Jugadores;
