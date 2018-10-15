import React, { Component } from 'react';
import TodoList from './Components/TodoList';
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
            ]
        }
    }


    render() {
    return (
      <div>
            <TodoList tasks={this.state.tasks}/>
      </div>
    );
  }
}

export default App;
