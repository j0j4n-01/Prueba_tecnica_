// import React, { useState, useEffect } from "react";
// // Cambia esta línea de importación
// import axiosClient from "../../service/axiosClient";  // Sin las llaves
// import Jugadores from "../../components/Jugadores/jugadores";
// import "./Juegos.css";

// const Juegos = () => {
//     const [jugadores, setJugadores] = useState([]);
//     const [gameStatus, setGameStatus] = useState("iniciado");

//     useEffect(() => {
//         axiosClient.get("/jugadores")
//             .then(response => setJugadores(response.data))
//             .catch(error => console.log("Error al cargar jugadores:", error));
//     }, []);

//     const startGame = () => {
//         setGameStatus("en progreso");
//     };

//     const finishGame = () => {
//         setGameStatus("terminado");
//     };

//     return (
//         <div className="juego-container">
//             <h1>¡Carrera de Caballos!</h1>
//             <div className="jugadores-container">
//                 {jugadores.map(jugador => (
//                     <Jugadores key={jugador.id} name={jugador.nombre} />
//                 ))}
//             </div>
//             <div className="buttons">
//                 {gameStatus === "iniciado" && (
//                     <button onClick={startGame}>Iniciar Juego</button>
//                 )}
//                 {gameStatus === "en progreso" && (
//                     <button onClick={finishGame}>Terminar Juego</button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Juegos;



import React, { useState, useEffect } from "react";
import "./Juegos.css";

const Juegos = () => {
    const [playerName, setPlayerName] = useState("");
    const [gameStage, setGameStage] = useState("login"); // login, playing
    const [victories, setVictories] = useState(0);
    const [deckId, setDeckId] = useState(null);
    const [trackCards, setTrackCards] = useState(Array(5).fill(null));
    const [horseCards, setHorseCards] = useState([]);
    const [currentCard, setCurrentCard] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmitName = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGameStage("playing");
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
            const position = trackCards.findIndex(
                (track) => track.value === card.value
            );
            if (position !== -1) {
                setWinner(horseCards[horseIndex]);
                setVictories((prev) => prev + 1);
            }
        }
    };

    const renderCard = (card, faceDown = false) => {
        if (!card) {
            return <div className="empty-card">?</div>;
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
                                <div key={`track-${index}`}>{renderCard(card, true)}</div>
                            ))}
                        </div>

                        <button
                            onClick={drawCard}
                            disabled={loading}
                            className="game-button"
                        >
                            Robar Carta
                        </button>

                        <div className="horse-cards">
                            {horseCards.map((card, index) => (
                                <div key={`horse-${index}`}>{renderCard(card)}</div>
                            ))}
                        </div>
                    </div>

                    {currentCard && (
                        <div className="current-card">
                            <p>Carta actual:</p>
                            <div className="card-display">{renderCard(currentCard)}</div>
                        </div>
                    )}
                </div>
            )}

            {winner && (
                <div className="winner-container">
                    <h3 className="winner-text">
                        ¡El AS de {winner.suit} ha ganado!
                    </h3>
                    <button
                        onClick={() => {
                            setWinner(null);
                            setCurrentCard(null);
                            setHorseCards([]);
                            setTrackCards(Array(5).fill(null));
                            initializeGame();
                        }}
                        className="game-button"
                    >
                        Jugar de nuevo
                    </button>
                </div>
            )}
        </div>
    );
};

export default Juegos;
