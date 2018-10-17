import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import AddTask from './Components/AddTask';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            addTaskShowing: false,
            formTask: {},
            isNewTask: true
        }
        this.state.count = 7;
    }

    incrementCount() {
        this.setState((state) => {
            return { count: this.state.count + 1 }
        });
    }

    addTask(task) {
        let tmpTasks = this.state.tasks;
        let found = false;
        for (var i = tmpTasks.length - 1; i >= 0; i--)
            if (tmpTasks[i].id === task.id) {
                tmpTasks[i] = task;
                found = true;
                break;
            }
        if (!found)
            tmpTasks.push(task);
        this.setState((state) => {
            return { tasks: tmpTasks }
        });
        this.hideAddTask();
    }

    handleDelete(task) {
        let tmpTasks = this.state.tasks;
        let found = false;
        for (var i = tmpTasks.length - 1; i >= 0; i--)
            if (tmpTasks[i].id === task.id) {
                tmpTasks.splice(i, 1);
                found = true;
                break;
            }
        if (!found)
            console.error("Excuse me wtf: trying to delete an element not present in the array");
        this.setState((state) => {
            return { tasks: tmpTasks }
        });
    }

    showAddTask() {
        this.setState((state) => {
            return { addTaskShowing: true }
        });
    }

    handleAddTask() {
        this.setState((state) => {
            return { formTask: {} , isNewTask: true }
        });
        this.showAddTask();
    }

    handleEditTask(task) {
        this.setState((state) => {
            return { formTask: task , isNewTask: false}
        });
        this.showAddTask();
    }


    hideAddTask() {
        this.setState((state) => {
            return { addTaskShowing: false }
        });
    }
    render() {
        console.log(this.state.tasks);
        let renderAddTaskForm =
            <AddTask
                count={this.state.count}
                incrementCount={this.incrementCount.bind(this)}
                task={this.state.formTask}
                isNew={this.state.isNewTask}
                hideAddTask={this.hideAddTask.bind(this)}
                handleSubmit={this.addTask.bind(this)}>
            </AddTask>
        return (
            <div>
                <div className="addBtnDiv">
                    <button className="addBtn" onClick={this.handleAddTask.bind(this)}>+</button>
                </div>
                {this.state.addTaskShowing ? renderAddTaskForm : ""}
                <TodoList
                    handleEditTask={this.handleEditTask.bind(this)}
                    handleDelete={this.handleDelete.bind(this)}
                    tasks={this.state.tasks} />
            </div>
        );
    }
}

export default App;
