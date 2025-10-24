import React, { useState } from 'react';
import Menu from './components/Menu';
import CarSelector from './components/CarSelector';
import TrackMap from './components/TrackMap';
import GameCanvas from './game/GameCanvas';
import Leaderboard from './components/Leaderboard';

// Game states
const GAME_STATES = {
  MENU: 'menu',
  CAR_SELECTION: 'car_selection',
  TRACK_SELECTION: 'track_selection',
  RACING: 'racing',
  LEADERBOARD: 'leaderboard'
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Handle menu actions
  const handleStartGame = () => {
    setGameState(GAME_STATES.CAR_SELECTION);
  };

  const handleViewLeaderboard = () => {
    setGameState(GAME_STATES.LEADERBOARD);
  };

  // Handle car selection
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setGameState(GAME_STATES.TRACK_SELECTION);
  };

  const handleCarSelectBack = () => {
    setGameState(GAME_STATES.MENU);
  };

  // Handle track selection
  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    setGameState(GAME_STATES.RACING);
  };

  const handleTrackSelectBack = () => {
    setGameState(GAME_STATES.CAR_SELECTION);
  };

  // Handle race end
  const handleRaceEnd = () => {
    setSelectedCar(null);
    setSelectedTrack(null);
    setGameState(GAME_STATES.MENU);
  };

  // Handle leaderboard back
  const handleLeaderboardBack = () => {
    setGameState(GAME_STATES.MENU);
  };

  // Render current game state
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {gameState === GAME_STATES.MENU && (
        <Menu 
          onStartGame={handleStartGame}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}

      {gameState === GAME_STATES.CAR_SELECTION && (
        <CarSelector 
          onSelectCar={handleCarSelect}
          onBack={handleCarSelectBack}
        />
      )}

      {gameState === GAME_STATES.TRACK_SELECTION && (
        <TrackMap 
          onSelectTrack={handleTrackSelect}
          onBack={handleTrackSelectBack}
          selectedCar={selectedCar}
        />
      )}

      {gameState === GAME_STATES.RACING && selectedCar && selectedTrack && (
        <GameCanvas 
          selectedCar={selectedCar}
          selectedTrack={selectedTrack}
          onRaceEnd={handleRaceEnd}
        />
      )}

      {gameState === GAME_STATES.LEADERBOARD && (
        <Leaderboard 
          onBack={handleLeaderboardBack}
        />
      )}
    </div>
  );
}

export default App;
