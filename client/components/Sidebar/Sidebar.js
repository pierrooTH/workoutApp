import React, { useState } from "react";
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import randomUser from '../../public/image/random-user.png'

const Sidebar = () => {

  return (
      <div className={styles.base}>
        <div className={styles.avatar}>
            <Image
            src={randomUser}
            alt="Image par défaut pour l'utilisateur"
            layout='fill'
          />
        </div>
          <div className={styles.linksToOthersPages}>
              <Link href='/'>
                  <p className={styles.linkParagraph}>Mes séances</p>
              </Link>
              <Link href='/'>
                  <p className={styles.linkParagraph}>Mon profil</p>
              </Link>
          </div>
      </div>
  );
};

export default Sidebar;