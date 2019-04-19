import React, { Component } from 'react';
import './App.css';
import { TreeNode } from './RecursiveTree/TreeNode';
import { IterativeTree } from './IterativeTree/IterativeTree';

class App extends Component {
    render() {
        return (
            <div className="app">
                <div>
                    <h3>Recursive tree</h3>
                    <TreeNode />
                </div>
                <div>
                    <h3>Iterative tree</h3>
                    <IterativeTree />
                </div>
            </div>
        );
    }
}

export default App;
