import React from 'react';
import styles from '../styles/menu.module.css';

const Menu = ({ onStartGame, onViewLeaderboard }) => {
  return (
    <div className={styles.menuContainer}>
      <div className={styles.background}></div>
      
      <div className={styles.content}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <span className={styles.titleRace}>RACE</span>
            <span className={styles.titleForge}>FORGE</span>
          </h1>
          <p className={styles.subtitle}>High-Octane 3D Racing Experience</p>
        </div>

        <div className={styles.menuButtons}>
          <button 
            className={`${styles.menuButton} ${styles.primaryButton}`}
            onClick={onStartGame}
          >
            <span className={styles.buttonIcon}>🏁</span>
            <span>START RACE</span>
          </button>
          
          <button 
            className={styles.menuButton}
            onClick={onViewLeaderboard}
          >
            <span className={styles.buttonIcon}>🏆</span>
            <span>LEADERBOARD</span>
          </button>
        </div>

        <div className={styles.footer}>
          <p>Use WASD or Arrow Keys to control your car</p>
          <p className={styles.version}>v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
