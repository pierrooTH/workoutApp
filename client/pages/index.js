import React, { useState, useEffect } from "react";
import Head from 'next/head'
import SignInForm from "../components/SignInForm";
import styles from '../styles/login.module.scss';

export default function Home() {

  return (
    <div className={styles.base}>
      <Head>
        <title>Sport Monitoring</title>
      </Head>
      <SignInForm/>
    </div>
  )
}
