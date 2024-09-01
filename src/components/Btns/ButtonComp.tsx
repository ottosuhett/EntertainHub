import React from 'react';
import styles from "./ButtonComp.module.scss"
import {Button,Container} from 'react-bootstrap';

export interface IButtonCompProps {
    title:string;
    onClickEvent?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonComp (props: IButtonCompProps) {
  return (
    <div>
        <Button className={styles.loginBtn} onClick={props.onClickEvent ?? props.onClickEvent}>
            <span className={styles.btnTitle}>{props.title}</span>
        </Button>
    </div>
  );
}
