import React, { Component } from 'react';
import '../App.css';

class Task extends Component {
    render() {
        return (
                <div className="task" id={`Task${this.props.task.id}`}>
                    <h2>{this.props.task.title}</h2>
                    {this.props.task.description}
                    <p></p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
        );
    }
}

export default Task;