import React from 'react';
import Button from '@material-ui/core/Button';
import { auth, db, provider } from "./firebase";
import "./Login.css";
import { setDetails } from './features/user/userSlice';
import { useDispatch } from 'react-redux';

function Login() {

    const dispatch = useDispatch();

    const sign_In = () => {
        auth.signInWithPopup(provider)
        .then( async (result) => {
            
            // put data in redux
            const name=result.user.displayName;
            const email=result.user.email;
            const photoUrl=result.user.photoURL;
            const id=result.user.uid;

            dispatch( setDetails( { name,email,photoUrl,id } ) );
            // put data in firebase
            await db.collection("users").doc(id).set( { email: email } );
        } )
        .catch( (error) => {
            console.log( "Error", error ) 
        } ) ;
    };

    return (
        <div className="login">
            <div className="heading">
                <img src="/images/logo.png" height="200px" width="200px" alt="" />
                <h1>Todo App</h1>
            </div> 
             <Button onClick={sign_In} color="primary" variant="contained" size="large">Sign In</Button>
        </div>
    )
}

export default Login;
