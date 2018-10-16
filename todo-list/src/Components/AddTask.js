import React, { Component } from 'react';
import '../App.css';

class AddTask extends Component {
    constructor() {
        super();
        this.state = { newTask: {} }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.task.id = this.props.count;
        this.task.title = this.refs.title.value;
        this.task.description = this.refs.description.value;
        this.task.state = parseInt(this.refs.state.value);
        this.props.incrementCount();
        let tmp = {};
        Object.assign(tmp, this.task);
        this.props.handleSubmit(tmp);

    }

    handleCancel(e) {
        if (e.target.children[0] && e.target.children[0].className === "taskForm")
            this.props.hideAddTask();
    }

    render() {
        if (!this.task)
            this.task = {
                id: this.props.count,
                title: "Title",
                description: "description",
                state: 1
            };
        return (
            <div className="addTask" onClick={this.handleCancel.bind(this)}>
                <div className="taskForm">
                    <h3>{"Add Task " + this.task.id}</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input className="formElem" ref="title" type="text" defaultValue={this.task.title}></input>
                            <textarea rows="5" className="formElem" ref="description" defaultValue={this.task.description}></textarea>
                            <select className="formElem" ref="state" defaultValue={this.props.task ? this.props.task : 1}>
                                <option value="1">To Do</option>
                                <option value="2">Doing</option>
                                <option value="3">Done</option>
                            </select>
                        </div>
                        <input className="formElem" type="submit" value="submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default AddTask;