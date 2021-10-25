import React, {useState} from 'react';
import styles from './SignUpForm.module.scss'
import axios from 'axios';
import SignInForm from './SignInForm';

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
        <div>
          {formSubmit ? 
            <div>
                <SignInForm/>
              <h4 className="success">
                Enregistrement réussi, veuillez-vous connecter
              </h4>
              </div>
           : 
            <form action="" method='POST' onSubmit={handleRegister} id="sign-up-form">
              <label htmlFor="pseudo">Pseudo</label>
              <br />
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                onChange={(e) => setPseudo(e.target.value)}
                value={pseudo}
              />
              <div className="pseudo error"></div>
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <div className="email error"></div>
              <br />
              <label htmlFor="password">Mot de passe</label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="password error"></div>
              <br />
              <label htmlFor="password-conf">Confirmer mot de passe</label>
              <br/>
              <input
                type="password"
                name="password"
                id="password-conf"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <input type="submit" value="Valider inscription" />
            </form>
          }
          </div>
      );
}

export default SignUpForm