import React , {useState,useContext,useEffect} from 'react';
import styles from "./LoginWindow.module.scss"
import {Form, Button,Container} from 'react-bootstrap';
import ButtonComp from "@/components/Btns/ButtonComp"
import { MainContext } from '@/app/context/MainContext';
import ToastComp from '../ToastComp/ToastComp';

export interface ILoginWindowProps {
}

export default function LoginWindow (props: ILoginWindowProps) {
  const {isLogged,setIsLogged,loggedUser,setLoggedUser} = useContext(MainContext)
  const [openRegister, setOpenRegister] = useState<boolean>(false)
  const [newUsername, setNewUsername] = useState<string>("")
  const [newPassword,setNewPassword] = useState<string>("")
  const [userName, setUserName ] = useState<string>("")
  const [passWord, setPassword] = useState<string>("")
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");


  useEffect(() => {
    if (isRegistered) {
      fetch('/api/list-users')
        .then((response) => response.json())
        .then((data) => {
          console.log('Registered users:', data.users);
          setIsRegistered(false);
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        });
    }
  }, [isRegistered]);

  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    event.preventDefault();
    const isEmptyField = isEmpty(newUsername,newPassword)

    if (isEmptyField) {
      setToastMessage('Do not leave fields blank');
      setShowToast(true);
    } else if (!validatePassword(newPassword)) {
      setToastMessage('Password must be at least 8 characters long, including letters, numbers and special symbols');
      setShowToast(true);
    }else{
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newUsername, password: newPassword }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setToastMessage('User registered successfully');
          setShowToast(true);
          setIsRegistered(true);
        } else {
          setToastMessage(data.error);
          setShowToast(true);
         
        }
      } catch (error) {
        setToastMessage(error as string);
        setShowToast(true);
        console.error('An error occurred:', error);
      }
      setNewUsername("")
      setNewPassword("")
      setOpenRegister(false)
    }
    
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const isEmptyField = isEmpty(userName,passWord)
    if(isEmptyField){
      setToastMessage('Fill in the blank login field');
      setShowToast(true);
    }else{
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userName, password: passWord }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          // Armazeno o token no localStorage
          localStorage.setItem('token', data.token);
          // Armazeno o user logado no localStorage
          localStorage.setItem('loggedUser', userName);

          setToastMessage('Login successful');
          setShowToast(true);
          setIsLogged(true)
          setLoggedUser(userName)
        } else {
          setToastMessage(data.error);
          setShowToast(true);
        }
      } catch (error) {
        setToastMessage('An error occurred during login');
        setShowToast(true);
        console.error('An error occurred:', error);
      }
    }
    
  };

  const isEmpty=(userName:string,psw:string):boolean=>{
    if(userName.length === 0 || psw.length === 0){
      return true
    }
    else{
      return false
    }

  }
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        {openRegister ? 
        <div className={styles.inputsDiv}>
          <Form.Control
          type="text" 
          placeholder="Choose a username" 
          className={styles.inputRegister}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
          />
          <Form.Control 
          type="password"  
          placeholder="Choose a password min 8 characters including letters, numbers and special symbols" 
          className={styles.inputRegister}
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          />
          <ButtonComp title={"Register"} onClickEvent={handleRegister}/>
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
              value={userName}
              onChange={(e)=>setUserName(e.target.value)}
              />
              <Form.Control 
              type="password" 
              placeholder="Password" 
              className={styles.input}
              value={passWord}
              onChange={(e)=>setPassword(e.target.value)}
              
              />
            </div>
            <p className={styles.registerMsg}>Don't have an account, 
              <Button 
                className={styles.registerLink}
                onClick={()=>{
                  setOpenRegister(!openRegister)
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  
                }}
              >
                  register now
            </Button>
            </p>
            <ButtonComp title={"Login"} onClickEvent={handleLogin}/>
        </div>
        <ToastComp msg={toastMessage} show={showToast} setShow={setShowToast} />
      </div>
    </div>
  );
}
