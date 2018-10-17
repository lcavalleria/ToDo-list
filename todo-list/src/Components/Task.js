import React, { Component } from 'react';
import '../App.css';

class Task extends Component {
    handleEdit = () => {
        this.props.handleEditTask(this.props.task);
    }
    handleDelete = () => {
        this.props.handleDelete(this.props.task);
    }
    render() {
        return (
            <div className="task" id={`Task${this.props.task.id}`}>
                <h2>{this.props.task.title}</h2>
                {this.props.task.description}
                <p></p>
                <button onClick={this.handleEdit.bind(this)}>Edit</button>
                <button onClick={this.handleDelete.bind(this)}>Delete</button>
            </div>
        );
    }
}

export default Task;