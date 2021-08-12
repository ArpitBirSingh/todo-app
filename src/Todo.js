import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import "./Todo.css";
import { db } from './firebase';
import { useSelector } from 'react-redux';

function Todo( { text, done, todoid } ) {

    const { id } = useSelector(state => state.user);

    const deleteTodo = () => {
        db.collection("users").doc(id).collection("todo").doc(todoid).delete();
    }

    const updateDone = () => {
        db.collection("users").doc(id).collection("todo").doc(todoid).update( {done: !done} );
    }

    return (
        <div className="todo">              
            <Checkbox
                key={todoid}
                checked={done}
                onClick = { updateDone }
                color="primary" />
            <p>{text}</p>
            <CancelRoundedIcon onClick={deleteTodo} />
        </div>
    )
}

export default Todo;
