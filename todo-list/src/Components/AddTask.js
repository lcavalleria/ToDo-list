import React, { Component } from 'react';
import '../App.css';

class AddTask extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let task = {};
        if (this.props.isNew) {
            task.id = this.props.count;
            this.props.incrementCount();
        }
        else
            task.id = this.props.task.id;
        task.title = this.refs.title.value;
        task.description = this.refs.description.value;
        task.state = parseInt(this.refs.state.value);
        this.props.handleSubmit(task);
    }

    handleCancel(e) {
        this.task = {};
        if (e.target.children[0] &&
            e.target.children[0].className === "taskForm")
            this.props.hideAddTask();
    }

    isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    render() {
        this.task = this.props.task;
        if (!this.isEmptyObject(this.props.task)) {
            this.task = this.props.task;
        }
        else {
            this.task = {
                id: this.props.count,
                title: "Title",
                description: "Lorem ipsum sit amet blah blah blah...",
                state: 1
            };
        }
        return (
            <div className="addTask" onClick={this.handleCancel.bind(this)}>
                <div className="taskForm">
                    <h3>{"Add Task " + this.task.id}</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input className="formElem" ref="title" type="text" defaultValue={this.task.title}></input>
                            <textarea rows="5" className="formElem" ref="description" defaultValue={this.task.description}></textarea>
                            <select className="formElem" ref="state" defaultValue={this.task.state}>
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