import React from 'react';
import { MainContext } from "@/app/context/MainContext";
import {Form} from 'react-bootstrap';
import styles from "./InputControl.module.scss"

export interface IInputControlProps {
    placeholder:string
}

export default function InputControl (props: IInputControlProps) {
  return (
    <div>
        <Form>
        <Form.Group className="mb-3" controlId="exampleForm">
            <Form.Control 
            type="text" 
            placeholder={props.placeholder}
            className={styles.inputControl}
            size="lg"
            />
        </Form.Group>
      </Form>
      
    </div>
  );
}
