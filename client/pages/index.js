import React from "react";
import Head from 'next/head'
import SignInForm from "../components/SignInForm";
import styles from '../styles/login.module.scss';

export default function Home() {

  return (
    <div className={styles.base}>
      <Head>
        <title>WorkoutApp</title>
      </Head>
      <SignInForm/>
    </div>
  )
}
