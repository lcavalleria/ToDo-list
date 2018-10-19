import React, { Component } from 'react';
import TodoList from './Components/TodoList';
import AddTask from './Components/AddTask';
import Login from './Components/Login';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            addTaskShowing: false,
            loginShowing: true,
            formTask: {},
            isNewTask: true,
            username: "",
            count: 0
        }
    }

    updateClient() {
        fetch("/users/" + this.state.username)
            .then((res) => {
                if (res.status === 204)
                    return { tasks: [], count: 0 };
                return res.json();
            })
            .then(resObj => {
                this.setState((state) => {
                    return {
                        tasks: resObj.tasks,
                        count: resObj.count
                    }
                });
            });
    }

    updateServerTasks() {
        fetch("/users/" + this.state.username, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tasks: this.state.tasks,
                addedTask: this.state.isNewTask
            })
        })
            .then(res => {
                return res.json();
            })
            .then(resObj => {
                this.setState((state) => {
                    return {
                        tasks: resObj.tasks,
                        count: resObj.count
                    }
                });
            });
    }

    updateServerLogin() {
        console.log({
            name: this.state.username
        });
        fetch("/users/login", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.username
            })
        })
            .then(res => {
                if (res.ok)
                    return res.json();
            })
            .then(resObj => {
                if (resObj)
                    this.setState((state) => {
                        return {
                            tasks: resObj.tasks,
                            count: resObj.count
                        }
                    });
            });
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
        this.updateServerTasks();
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
            return { tasks: tmpTasks, isNewTask: false }
        });
        this.updateServerTasks();
    }

    showAddTask() {
        this.setState((state) => {
            return { addTaskShowing: true }
        });
    }

    handleAddTask() {
        this.setState((state) => {
            return { formTask: {}, isNewTask: true }
        });
        this.showAddTask();
    }

    handleEditTask(task) {
        this.setState((state) => {
            return { formTask: task, isNewTask: false }
        });
        this.showAddTask();
    }

    hideAddTask() {
        this.setState((state) => {
            return { addTaskShowing: false }
        });
    }

    hideLogin() {
        this.setState((state) => {
            return { loginShowing: false }
        });
    }

    login(name) {
        this.setState((state) => {
            return { username: name }
        }, () => {
            this.updateServerLogin();
            this.hideLogin();
        });
    }

    render() {
        let renderAddTaskForm =
            <AddTask
                count={this.state.count}
                incrementCount={this.incrementCount.bind(this)}
                task={this.state.formTask}
                isNew={this.state.isNewTask}
                hideAddTask={this.hideAddTask.bind(this)}
                handleSubmit={this.addTask.bind(this)}>
            </AddTask>
        let renderLoginForm =
            <Login
                handleSubmit={this.login.bind(this)}>
            </Login>
        return (
            <div>
                <div className="addBtnDiv">
                    <button className="addBtn" onClick={this.handleAddTask.bind(this)}>+</button>
                </div>
                {this.state.loginShowing ? renderLoginForm : ""}
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
