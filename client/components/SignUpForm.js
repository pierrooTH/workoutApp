import React, { useState } from 'react';
import styles from './SignUpForm.module.scss'
import axios from 'axios';
import SignInForm from './SignInForm';
import Image from 'next/image';
import rockyImage from '../public/image/rocky.jpg';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const SignUpForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmit, setFormSubmit] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BACK_API_URL}/user/register`,
      data: {
        pseudo,
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        setFormSubmit(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.baseSuccess}>
      {formSubmit ?
        <div>
          <SignInForm />
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </div>
        :
        <div className={styles.base}>
          <div className={styles.contentForm}>
            <h1>Bienvenu sur <span className={styles.workoutTitle}>WorkoutApp</span></h1>
            <h2>S'inscrire</h2>
          <form action="" method='POST' onSubmit={handleRegister} id="sign-up-form">
            <label htmlFor="pseudo"></label>
            <br />
            <div className={styles.inputSignUpLogo}>
              <div className={styles.icon}>
                <PersonIcon />
              </div>
              <input
                className={styles.inputSignUp}
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
                placeholder='pseudo'
              />
            </div>
            
            <div className="pseudo error"></div>
            <br />
            <label htmlFor="email"></label>
            <br />
            <div className={styles.inputSignUpLogo}>
              <div className={styles.icon}>
                <EmailIcon />
              </div>
              <input
                className={styles.inputSignUp}
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='email'
              />
            </div>
           
            <div className="email error"></div>
            <br />
            <label htmlFor="password"></label>
            <br />
            <div className={styles.inputSignUpLogo}>
              <div className={styles.icon}>
                <LockIcon />
              </div>
              <input
                className={styles.inputSignUp}
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='mot de passe'
              />
            </div>
            <div className="password error"></div>
            <br />
            <label htmlFor="password-conf"></label>
            <br />
            <div className={styles.inputSignUpLogo}>
              <div className={styles.icon}>
                <LockIcon />
              </div>
              <input
                className={styles.inputSignUp}
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder='confirmer mot de passe'
              />
            </div>
            <div className={styles.submitFormBtn}>
              <input type="submit" value="Valider inscription" />
            </div>
          </form>
          </div>
          <div className={styles.imageContainer}>
            <Image
              className={styles.image}
              src={rockyImage}
              alt="Image de Rocky le film"
              layout='fill'
            />
          </div>
        </div>
      }
    </div>
  );
}

export default SignUpForm