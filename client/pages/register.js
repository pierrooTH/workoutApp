import React from 'react';
import SignUpForm from "../components/SignUpForm";
import styles from '../styles/login.module.scss';

const Register = () => {
    return (
        <div className={styles.base}>
            <SignUpForm/>
        </div>
    )
}

export default Register
