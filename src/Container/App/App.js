// libs
import React, { useState, useEffect, useRef } from "react";
import classes from "./App.module.css";
import axios from "../../axios-firebase";
// conposants
import Task from "../../Component/Task/Task";
function App() {
  // states
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Etats
  useEffect(()=> {
    elementInput.current.focus();
    fetchTasks();
  }, []);

  // methodes
  const checkedClickHandler = (index) => {
    const checkedTask = [...tasks];
    
    if (checkedTask[index].checked === false) {
       
      checkedTask[index].checked = true;
      setTasks(checkedTask);
      
    } else {
     
      checkedTask[index].checked = false;
      setTasks(checkedTask);
      }

    axios
      .put(`/tasks/${tasks[index].id}.json`, checkedTask[index])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeClickHandler = (index) => {
    const removeFromTask = [...tasks];
    removeFromTask.splice(index,1);
    setTasks(removeFromTask);

    axios
      .delete(`/tasks/${tasks[index].id}.json`, tasks[index])
      .then((response) =>{
        console.log(response);
      })
      .catch((error) =>{
        console.log(error);
      });
  };

  const changedFormHandler = event => {
    setInput(event.target.value);
  }
  const addTaskClickHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (input !== "") {
      const addTask = {content : input, checked :false} ;
      setInput("");

      axios
        .post("/tasks.json", addTask)
        .then((response) =>{
          console.log(response);
          fetchTasks();
        })
        .catch((error) =>{
          console.log(error);
        })
    }
  };

  const fetchTasks = () => {
    
    axios
      .get("/tasks.json")
      .then((response) => {
        const newTask = [];

        for (const key in response.data) {
          newTask.push({
            ...response.data[key],
            id: key,
          });
        }
        setTasks(newTask);
      })
      .catch((error) =>{
        console.log(error);
      });

  };

  // focus au chargement de la page
  const elementInput = useRef(null);
  let myInputRef = elementInput;
   
  // JSX
  let haveTo = tasks.map((task, index) => {
    
    return (
      <Task
        key={"task_" + index}
        logo={task.icon}
        checked={task.checked}
        todo={task.content}
        clicked={() => checkedClickHandler(index)}
        removed={() => removeClickHandler(index)}
      />
    );
  });

  return (
    <div className={classes.App}>
      <header>
        <span>React TO-DO</span>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => addTaskClickHandler(e)}>
          <input className="newTask" 
          value={input}
          onChange={e => changedFormHandler(e)}
          ref={myInputRef}  
          type="text" placeholder="Que souhaitez-vous ajouter ?" />
          <button  type="submit" >Ajouter</button>
        </form >
      </div>
      {haveTo}
    </div>
  );
}

export default App;
