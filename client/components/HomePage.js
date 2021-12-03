import React, { useState } from "react";
import styles from './HomePage.module.scss';
import Link from 'next/link'
import Sidebar from "./Sidebar/Sidebar";
import CardWorkout from "./CardWorkout/CardWorkout";

const HomePage = () => {

  return (
      <div className={styles.base}>
          <Sidebar />
          <div className={styles.baseRightContent}>
              <h1 className={styles.welcome}>Bienvenue</h1>
              <h2 className={styles.paragraphWorkout}>Mes trois dernières séances</h2>
              <div className={styles.cardWorkout}>
                  <CardWorkout/>
                  <CardWorkout/>
                  <CardWorkout/>
              </div>
          </div>
      </div>
  );
};

export default HomePage;