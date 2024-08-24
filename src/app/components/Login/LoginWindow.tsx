import React from 'react';
import styles from "./LoginWindow.module.scss"
import {Container} from "react-bootstrap"

export interface ILoginWindowProps {
}

export default function LoginWindow (props: ILoginWindowProps) {
  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.leftContainer}></div>
      <div className={styles.rightContainer}></div>
    </Container>
  );
}
