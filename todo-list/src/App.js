import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import AddTask from './Components/AddTask';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [
                {
                    id: 1,
                    title: "done 1",
                    description: "blah blah blah blah...",
                    state: 3
                },
                {
                    id: 2,
                    title: "done 2",
                    description: "asdf efasdf v fxvzx...",
                    state: 3
                },
                {
                    id: 3,
                    title: "doing 1",
                    description: "bc vb cxvc bc cc vb...",
                    state: 2
                },
                {
                    id: 4,
                    title: "todo 1",
                    description: "tyu ytutyu tt tyut...",
                    state: 1
                },
                {
                    id: 5,
                    title: "todo 2",
                    description: "tyu ytutyu tt tyut...",
                    state: 1
                },
                {
                    id: 6,
                    title: "todo 3",
                    description: "tyu ytutyu tt tyut...",
                    state: 1
                }
            ],
            showAddTask: false
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
        tmpTasks.push(task);
        this.setState((state) => {
            return { tasks: tmpTasks }
        });
        this.hideAddTask();
    }

    showAddTask() {
        this.setState((state) => {
            return { showAddTask: true }
        });
    }

    hideAddTask() {
        this.setState((state) => {
            return { showAddTask: false }
        });
    }
    render() {
        let renderAddTaskForm =
            <AddTask
                count={this.state.count}
                incrementCount={this.incrementCount.bind(this)}
                hideAddTask={this.hideAddTask.bind(this)}
                handleSubmit={this.addTask.bind(this)}>
            </AddTask>
        return (
            <div>
                <div className="addBtnDiv">
                    <button className="addBtn" onClick={this.showAddTask.bind(this)}>+</button>
                </div>
                {this.state.showAddTask ? renderAddTaskForm : ""}
                <TodoList tasks={this.state.tasks} />
            </div>
        );
    }
}

export default App;
