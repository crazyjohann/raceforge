import React, { useState, useEffect } from 'react';
import { getAllTracks, getLeaderboard, formatTime } from '../game/tracks';
import styles from '../styles/leaderboard.module.css';

const Leaderboard = ({ onBack, selectedTrackId = 1 }) => {
  const tracks = getAllTracks();
  const [currentTrackId, setCurrentTrackId] = useState(selectedTrackId);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const data = getLeaderboard(currentTrackId);
    setLeaderboardData(data);
  }, [currentTrackId]);

  const currentTrack = tracks.find(t => t.id === currentTrackId);

  return (
    <div className={styles.leaderboardContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          ← BACK
        </button>
        <h2 className={styles.title}>LEADERBOARD</h2>
      </div>

      <div className={styles.content}>
        {/* Track Selector */}
        <div className={styles.trackSelector}>
          {tracks.map(track => (
            <button
              key={track.id}
              className={`${styles.trackButton} ${currentTrackId === track.id ? styles.active : ''}`}
              onClick={() => setCurrentTrackId(track.id)}
            >
              {track.name}
            </button>
          ))}
        </div>

        {/* Track Info */}
        <div className={styles.trackInfo}>
          <h3>{currentTrack?.name}</h3>
          <p>{currentTrack?.description}</p>
          <div className={styles.trackStats}>
            <span>Length: {currentTrack?.length} km</span>
            <span>Corners: {currentTrack?.corners}</span>
            <span>Difficulty: {currentTrack?.difficulty}</span>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className={styles.tableContainer}>
          {leaderboardData.length > 0 ? (
            <table className={styles.leaderboardTable}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Time</th>
                  <th>Car</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr key={index} className={index < 3 ? styles.topThree : ''}>
                    <td className={styles.rank}>
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && (index + 1)}
                    </td>
                    <td className={styles.time}>{formatTime(entry.time)}</td>
                    <td className={styles.car}>{entry.carName}</td>
                    <td className={styles.date}>
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noData}>
              <p>No lap times recorded yet.</p>
              <p>Be the first to set a record!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
