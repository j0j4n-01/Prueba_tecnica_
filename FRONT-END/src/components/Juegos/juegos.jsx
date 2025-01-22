import React, { useState, useEffect } from "react";
import { createJugador } from "../../service/jugadoresService";
import "./Juegos.css";

const Juegos = () => {
    const [trackCards, setTrackCards] = useState(Array(10).fill(null));  
    const [playerName, setPlayerName] = useState("");
    const [gameStage, setGameStage] = useState("login"); 
    const [victories, setVictories] = useState(0);
    const [deckId, setDeckId] = useState(null);
    const [horseCards, setHorseCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedHorse, setSelectedHorse] = useState(null);  
    const [horsePositions, setHorsePositions] = useState({
        "HEARTS": 0,
        "DIAMONDS": 0,
        "CLUBS": 0,
        "SPADES": 0,
    });
    const horses = [
        { suit: "HEARTS", label: "Corazón" },
        { suit: "DIAMONDS", label: "Diamante" },
        { suit: "CLUBS", label: "Trébol" },
        { suit: "SPADES", label: "Pica" }
    ];

    const handleSubmitName = async (e) => {
        e.preventDefault();
        if (playerName.trim() && selectedHorse) {
            try {
                const jugadorCreado = await createJugador({ nombre: playerName });
                if (jugadorCreado) {
                    setGameStage("playing");
                }
            } catch (error) {
                alert("Hubo un error al crear el jugador. Intenta nuevamente.");
                console.error(error);
            }
        } else {
            alert("Por favor, selecciona un caballo y un nombre.");
        }
    };

    const initializeGame = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://deckofcardsapi.com/api/deck/new/shuffle/"
            );
            const data = await response.json();
            setDeckId(data.deck_id);

            // Obtener los ases (caballos)
            const acesResponse = await fetch(
                `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`
            );
            const acesData = await acesResponse.json();

            // Filtrar solo los ases
            const aces = acesData.cards.filter((card) => card.value === "ACE");
            setHorseCards(aces);

            // Obtener 5 cartas para la pista
            const trackResponse = await fetch(
                `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=5`
            );
            const trackData = await trackResponse.json();

            setTrackCards(trackData.cards);

            // Crear nuevo mazo para las cartas a robar
            const newDeckResponse = await fetch(
                "https://deckofcardsapi.com/api/deck/new/shuffle/"
            );
            const newDeckData = await newDeckResponse.json();
            setDeckId(newDeckData.deck_id);
        } catch (error) {
            console.error("Error inicializando el juego:", error);
        }
        setLoading(false);
    };

    const selectHorse = (suit) => {
        setSelectedHorse(suit);
    };

    const drawCard = async () => {
        if (!deckId || winner) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
            );
            const data = await response.json();

            if (data.cards.length > 0) {
                const card = data.cards[0];
                setCurrentCard(card);
                checkWinner(card);
            }
        } catch (error) {
            console.error("Error dibujando carta:", error);
        }
        setLoading(false);
    };

    const checkWinner = (card) => {
        const horseIndex = horseCards.findIndex(
            (horse) => horse.suit === card.suit
        );
        
        if (horseIndex !== -1) {
            const horseSuit = card.suit;
    
            // Aumenta la posición del caballo seleccionado
            setHorsePositions((prevPositions) => ({
                ...prevPositions,
                [horseSuit]: prevPositions[horseSuit] + 1,
            }));
    
            // verificar cual carta llego al final
            if (horseSuit === selectedHorse && horsePositions[horseSuit] >= 10) {
                setWinner(true); 
                setVictories((prev) => prev + 1);  
                alert("¡Felicidades, has ganado!");
            } else if (horsePositions[horseSuit] >= 10) {
                if (horseSuit !== selectedHorse) {
                    setWinner(false); 
                    alert("Lo siento, has perdido.");
                }
            }
        }
    };
    

    const renderCard = (card, faceDown = false) => {
        if (!card) {
            return <div className="empty-card"></div>;
        }

        if (faceDown) {
            return <div className="card card-back"></div>;
        }

        return (
            <img
                src={card.image}
                alt={`${card.value} of ${card.suit}`}
                className="card-image"
            />
        );
    };

    if (gameStage === "login") {
        return (
            <div className="game-container">
                <div className="login-form">
                    <h1 className="game-title">¡Carrera de Caballos!</h1>
                    <form onSubmit={handleSubmitName}>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Ingresa tu nombre"
                            className="name-input"
                            required
                        />
                        <div className="horse-selection">
                            
                            {horses.map((horse) => (
                                <button
                                    key={horse.suit}
                                    type="button"
                                    onClick={() => selectHorse(horse.suit)}
                                    className={`horse-button ${selectedHorse === horse.suit ? "selected" : ""}`}
                                    disabled={selectedHorse}
                                >
                                    {horse.label}
                                </button>
                            ))}
                        </div>
                        <button type="submit" className="game-button">
                            Comenzar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="game-container">
            <div className="game-header">
                <h1 className="game-title">¡Carrera de Caballos!</h1>
                <div className="player-info">
                    <span className="player-name">Jugador: {playerName}</span>
                    <span className="victories">Victorias: {victories}</span>
                </div>
            </div>
            <div className="horse-cards">
                {horseCards.map((card, index) => {
                    const horsePosition = horsePositions[card.suit];  
                    return (
                        <div
                            key={`horse-${index}`}
                            className="horse-card"
                            style={{ transform: `translateX(${horsePosition * 20}px)` }}  
                        >
                            {renderCard(card)}
                        </div>
                    );
                })}
            </div>

            {!horseCards.length ? (
                <button
                    onClick={initializeGame}
                    disabled={loading}
                    className="game-button"
                >
                    Iniciar Juego
                </button>
            ) : (
                <div className="game-board">
                    <div className="main-game-area">
                        <div className="track-cards">
                            {trackCards.map((card, index) => (
                                <div key={`track-${index}`} className="track-card">
                                    {renderCard(card, true)} 
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={drawCard}
                            disabled={loading}
                            className="game-button"
                        >
                            Sacar Carta
                        </button>
                    </div>

                    {currentCard && (
                        <div className="current-card">
                            <p>CARTA:</p>
                            <div className="card-display">{renderCard(currentCard)}</div>
                        </div>
                    )}
                </div>
            )}

{winner !== null && (
    <div className="winner-container">
        <h3 className="winner-text">
            {winner ? `¡El AS de ${selectedHorse} ha ganado!` : "Lo siento, has perdido."}
        </h3>
        <button
            onClick={() => {
                setWinner(null);
                setHorsePositions({
                    HEARTS: 0,
                    DIAMONDS: 0,
                    CLUBS: 0,
                    SPADES: 0,
                });
                setTrackCards(Array(10).fill(null)); 
            }}
            className="game-button"
        >
            Volver a jugar
        </button>
    </div>
)}

        </div>
    );
};

export default Juegos;
