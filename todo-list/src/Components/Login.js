import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let name = this.refs.name.value;
        this.props.handleSubmit(name);
    }

    render() {
        return (
            <div className="addTask">
                <div className="taskForm">
                    <h3>{"Log in"}</h3>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <input className="formElem" ref="name" type="text"></input>
                        </div>
                        <input className="formElem" type="submit" value="Login" />
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;