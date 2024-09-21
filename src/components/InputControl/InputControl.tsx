import React, { useContext } from 'react';
import { MainContext } from "@/app/context/MainContext";
import {Form, Container} from 'react-bootstrap';
import styles from "./InputControl.module.scss"

export interface IInputControlProps {
    placeholder:string
}

export default function InputControl (props: IInputControlProps) {
    const {gameList,searchedGame, setSearchedGame} = useContext(MainContext)
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedGame(event.target.value);
    };
     
  return (
    <Container className={styles.mainContainer}>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm">
                <Form.Control 
                type="text" 
                placeholder={props.placeholder}
                className={styles.inputControl}
                value={searchedGame}
                onChange={handleChange}
                />
            </Form.Group>   
      </Form>
      
    </Container>
  );
}
