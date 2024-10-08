import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { handleCloseModal } from '@/app/functions/genericFunctions';

export interface IModalCompProps {
    title:string;
    children?: React.ReactNode;
    closeBtnTxt:string;
    confirmBtnTxt:string;
    state:boolean;
    setState:React.Dispatch<React.SetStateAction<boolean>>
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
          <Button variant="secondary" onClick={()=>handleCloseModal(props.setState)}>
            {props.closeBtnTxt}
          </Button>
          <Button variant="primary" onClick={()=>handleCloseModal(props.setState)}>
            {props.confirmBtnTxt}
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      );
}
