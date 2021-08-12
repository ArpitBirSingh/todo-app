import { Avatar } from '@material-ui/core';
import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { auth, db } from "./firebase";
import firebase from "firebase/app";
import './App.css';
import Todos from './Todos';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { removeDetails, setDetails } from './features/user/userSlice';

function App() {
  const [input, setInput] = useState("");
  const { userName } = useSelector( state => state.user);
  const { photoUrl } = useSelector(state => state.user);
  const { id } = useSelector(state => state.user);

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.collection("users").doc(id).collection("todo").add({
      input: input,
      done: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
  };

  const sign_Out = () => {
    auth.signOut()
    .then( () =>{
      dispatch(removeDetails());
    } )
    .catch( (error) => {
      console.log("Error",error);
    } );
  };

  auth.onAuthStateChanged(async (user) => {    // firebase store user in cookie and we call that cookie
    if (user) {
          const name=user.displayName;
          const email=user.email;
          const photoUrl=user.photoURL;
          const id=user.uid;
          dispatch( setDetails( { name,email,photoUrl,id } ) );
    }
  });

  return (
    <div className="app" style={{ background:'url("/images/background-image.png")' }}>
     {(!userName) ? <Login /> :
      <>
        <div className="app__header">
            <img src="/images/logo.png" height="60px" width="60px" alt="" />
            <h1>Todo App</h1>
          <div onClick={sign_Out} className="avatar">
            <Avatar src={photoUrl} />
            <h3>Hi, {userName}</h3>  
          </div>
        </div>


        <div className="todoapp">
          <div className="tasks">
            <form className="input" onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={ (e) => setInput(e.target.value) } placeholder="Enter Something ..." />
                <AddIcon onClick={handleSubmit} />
            </form>
            <Todos />
            
            
            
          </div>  
        </div>
      </>  }
      
    
    </div>
  );
}

export default App;
