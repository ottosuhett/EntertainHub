import React , {useState} from 'react';
import styles from "./LoginWindow.module.scss"
import {Container} from "react-bootstrap"
import {Form, Button} from 'react-bootstrap';
import ButtonComp from "@/components/Btns/ButtonComp"

export interface ILoginWindowProps {
}

export default function LoginWindow (props: ILoginWindowProps) {
  const [openRegister, setOpenRegister] = useState<boolean>(false)

  return (
    <Container fluid className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <div></div>
        {openRegister ? 
        <div className={styles.inputsDiv}>
          <Form.Control
          type="text" 
          placeholder="Choose a username" 
          className={styles.inputRegister}
          />
          <Form.Control 
          type="text" 
          placeholder="Choose a password max 8 characters" 
          className={styles.inputRegister}
          maxLength={8}
          />
        </div>
        :null}
        <p className={styles.leftDrescriptionMsg}>Store your <span className={styles.highlightMsg}>favorite</span> media</p>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.mainRightContainerContent}>
          
            <div className={styles.titleContainer}>
              <p className={styles.title}>Entertainhub</p>
              <p className={styles.loginTxt}>Login</p>
            </div>
          
            <div className={styles.inputsDiv}>
              <Form.Control
              type="text" 
              placeholder="User" 
              className={styles.input}
              />
              <Form.Control 
              type="text" 
              placeholder="Password" 
              className={styles.input}
              
              />
            </div>
            <p className={styles.registerMsg}>Don't have an account, 
              <Button 
                className={styles.registerLink}
                onClick={()=>setOpenRegister(!openRegister)}
              >
                  register now
            </Button>
            </p>
            <ButtonComp title={"Login"}/>
        </div>
        
      </div>
    </Container>
  );
}
