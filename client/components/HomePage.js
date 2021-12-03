import React, { useState } from "react";
import styles from './HomePage.module.scss';
import Link from 'next/link'
import Sidebar from "./Sidebar/Sidebar";

const HomePage = () => {

  return (
      <div className={styles.base}>
          <Sidebar />
          <div className={styles.baseRightContent}>
              <h1 className={styles.welcome}>Bienvenue</h1>
              <h2 className={styles.paragraphWorkout}>Mes trois dernières séances</h2>
          </div>
      </div>
  );
};

export default HomePage;