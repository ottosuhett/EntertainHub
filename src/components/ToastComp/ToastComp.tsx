import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styles from "./ToastComp.module.scss";

export interface IToastCompProps {
    msg:string;
    show: boolean; 
    setShow: (value: boolean) => void; 
}
export default function ToastComp(props:IToastCompProps) {
  return (
    <>
        <ToastContainer
          className= {`p-3 ${styles.toastContainer}`}
          position={'middle-center'}
          style={{ zIndex: 1 }}
        >
          <Toast 
          onClose={() => props.setShow(false)}
          show={props.show} 
          delay={2000}
          autohide
          >
            <Toast.Header closeButton={false}>
              <img
                src="/images/logo.png"
                className={`rounded me-2 ${styles.img}`}
                alt="logo img"
              />
              <div className={styles.header}>
                <strong className={styles.title}>EntertainHub</strong>
                <small className={styles.timeTxt}>now</small>
              </div>
              
            </Toast.Header>
            <Toast.Body className={styles.msg}>{props.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
    </>
  );
}
