import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleCloseModal } from '@/app/functions/genericFunctions';
import styles from "./ModalComp.module.scss"
export interface IModalCompProps {
    title:string;
    children?: React.ReactNode;
    closeBtnTxt:string;
    confirmBtnTxt:string;
    state:boolean;
    setState:React.Dispatch<React.SetStateAction<boolean>>
    onConfirm: () => void;
    onCancel?:()=> void;
}

export default function ModalComp (props: IModalCompProps) {
    return (
        <div
          className="modal show"
          style={{ display: 'block', position: 'initial' }}
        >
          <Modal show={props.state} onHide={()=>handleCloseModal(props.setState)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button 
          variant="secondary" 
          onClick={()=>{
            if(props.onCancel){
              props.onCancel()
            }
            handleCloseModal(props.setState)
          }}
          className={styles.btn}
          >
            {props.closeBtnTxt}
          </Button>
          <Button 
          variant="primary" 
          onClick={()=>{
            handleCloseModal(props.setState)
            props.onConfirm()
          }
          }
          className={styles.btn}
          >
            {props.confirmBtnTxt}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      );
}
