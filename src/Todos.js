import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import "./Todos.css";
import { useSelector } from 'react-redux';
import { db } from './firebase';

function Todos() {
    const [todos, setTodos] = useState([]);
    const { id } = useSelector(state => state.user);

    useEffect(() => {
        db.collection("users").doc(id).collection("todo").orderBy("timestamp","desc").onSnapshot(
            snapshot => {
                setTodos( snapshot.docs.map( (doc) => ( { todoid:doc.id, data: { input:doc.data().input, done:doc.data().done } } )  ) 
                       );
            }
        );
    }, [id]);

    return (
        <div className="todos">
            
            { todos.map( (todo) => ( 

                <Todo key={todo.todoid} text={todo.data.input} done={todo.data.done} todoid={todo.todoid} />

            ) ) }
        </div>
    )
}

export default Todos;