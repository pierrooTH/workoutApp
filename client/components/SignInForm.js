import React, { useState } from "react";
import axios from "axios";
import styles from './SignInForm.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import imageMotivation from '../public/image/motivation.jpg';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BACK_API_URL}/user/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          window.location = "/app";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (<div className={styles.base}>
    <div className={styles.imageContainer}>
      <Image
        className={styles.image}
        src={imageMotivation}
        alt="Image de motivation pour login"
        layout='fill'
      />
    </div>
    <div className={styles.contentForm}>
      <h1>Bienvenu sur <span className={styles.workoutTitle}>WorkoutApp</span></h1>
      <div className={styles.centerElement}>
        <h2>Se connecter</h2>
        <div className={styles.formStyle}>
          <form action="" method='POST' id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <div className={styles.loginLogo}>
              <div className={styles.icon}>
                <EmailIcon/>
              </div>
            <input
              className={styles.inputLogin}
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            </div>
            <div className="email error"></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <div className={styles.loginLogo}>
              <div className={styles.icon}>
              <LockIcon />
              </div>
            <input
              className={styles.inputLogin}
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            </div>
            <div className="password error"></div>
            <br />
            <button className={styles.login} onClick={handleLogin}>Se connecter</button>
            <Link href="/register">
              <button className={styles.linkRegister} >S'inscrire</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SignInForm;