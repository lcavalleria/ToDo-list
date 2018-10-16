import React, { Component } from 'react';
import Task from './Task'; 
import '../App.css';

class TodoList extends Component {
    renderArr(arr) {
        return (
            arr.map((task) => <Task key={task.id} task={task} />));
    }
    
    render() {
        var arrDone = [];
        var arrDoing = [];
        var arrTodo = [];
        this.props.tasks.forEach(task => {
            if (task.state === 1)
                arrTodo.push(task);
            else if (task.state === 2) 
                arrDoing.push(task);
            else if (task.state === 3) 
                arrDone.push(task);
            else console.error("ERROR!! task state should be 1 2 or 3");
        });

        return (
            <div>
                <div className="column" id="done">
                    <h1>Done</h1>
                    {this.renderArr(arrDone)}
                </div>
                <div className="column" id="doing">
                    <h1>Doing</h1>
                    {this.renderArr(arrDoing)}
                </div>
                <div className="column" id="todo">
                    <h1>To Do</h1>
                    {this.renderArr(arrTodo)}
                </div>
            </div>
        );
    }
}

export default TodoList;
