import React from 'react';
import styles from "./LoginWindow.module.scss"
import {Container} from "react-bootstrap"

export interface ILoginWindowProps {
}

export default function LoginWindow (props: ILoginWindowProps) {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <p className={styles.leftDrescriptionMsg}>Store your <span className={styles.highlightMsg}>favorite</span> media</p>
      </div>
      <div className={styles.rightContainer}></div>
    </Container>
  );
}
