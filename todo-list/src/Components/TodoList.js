import React, { Component } from 'react';
import Task from './Task'; 
import '../App.css';

class TodoList extends Component {
    render() {
        var renderedDone = [];
        var renderedDoing = [];
        var renderedTodo = [];
        this.props.tasks.forEach(task => {
            if (task.state === 1)
                renderedTodo.push(task);
            else if (task.state === 2) 
                renderedDoing.push(task);
            else if (task.state === 3) 
                renderedDone.push(task);
            else console.error("ERROR!! task state should be 1 2 or 3");
        });
        console.log(renderedDone);
        return (
            <div>
                <div><button>add</button></div>
                <div className="column" id="done">
                    <h1>Done</h1>
                    {renderedDone.map((task) => <Task key={task.id} task={task}/>)}
                </div>
                <div className="column" id="doing">
                    <h1>Doing</h1>
                    {renderedDoing.map((task) => <Task key={task.id} task={task}/>)}
                </div>
                <div className="column" id="todo">
                    <h1>To Do</h1>
                    {renderedTodo.map((task) => <Task key={task.id} task={task}/>)}

                </div>
            </div>
        );
    }
}

export default TodoList;
