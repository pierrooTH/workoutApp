import React, { useState } from "react";
import styles from './CardWorkout.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const CardWorkout = () => {

    return (
        <div className={styles.base}>
            <h3 className={styles.nameWorkout}>Nom de la séance</h3>
            <h4>Exercices : </h4>
            <ul>
                <li>Développé couché</li>
                <li>Développé couché incliné</li>
                <li>Tractions</li>
                <li>Rowing</li>
                <li>Développé couché prise sérrée</li>
                <li>Curl barre EZ</li>
                <li>Développé militaire</li>
            </ul>
            <div className={styles.btnWorkoutCard}>
                <Link href="/app/home">
                    <button className={styles.btn}>Voir séance</button>
                </Link>
            </div>
        </div>
    );
};

export default CardWorkout;