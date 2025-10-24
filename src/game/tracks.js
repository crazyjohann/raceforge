// Track data configuration for RaceForge
// Each track has unique characteristics and references its 3D model

export const tracks = [
  {
    id: 1,
    name: "Drift Circuit",
    model: "/src/assets/tracks/track1.glb",
    length: 2.8, // km
    corners: 12,
    difficulty: "Medium",
    description: "Technical drift circuit with flowing corners and elevation changes",
    bestLapTime: null, // Will be populated from localStorage
    recordHolder: null
  },
  {
    id: 2,
    name: "Paris Street Circuit",
    model: "/src/assets/tracks/track2.glb",
    length: 3.5, // km
    corners: 18,
    difficulty: "Hard",
    description: "Challenging street circuit through the heart of Paris with tight corners and historic landmarks",
    bestLapTime: null,
    recordHolder: null
  }
];

// Helper function to get track by ID
export const getTrackById = (id) => {
  return tracks.find(track => track.id === id);
};

// Helper function to get all tracks
export const getAllTracks = () => {
  return tracks;
};

// Leaderboard functions using localStorage
export const saveLeaderboardEntry = (trackId, time, carName) => {
  const key = `leaderboard_track_${trackId}`;
  const existing = localStorage.getItem(key);
  let leaderboard = existing ? JSON.parse(existing) : [];
  
  // Add new entry
  leaderboard.push({
    time,
    carName,
    date: new Date().toISOString()
  });
  
  // Sort by time (fastest first) and keep top 10
  leaderboard.sort((a, b) => a.time - b.time);
  leaderboard = leaderboard.slice(0, 10);
  
  localStorage.setItem(key, JSON.stringify(leaderboard));
  return leaderboard;
};

export const getLeaderboard = (trackId) => {
  const key = `leaderboard_track_${trackId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const getBestLapTime = (trackId) => {
  const leaderboard = getLeaderboard(trackId);
  return leaderboard.length > 0 ? leaderboard[0].time : null;
};

export const formatTime = (milliseconds) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
};
