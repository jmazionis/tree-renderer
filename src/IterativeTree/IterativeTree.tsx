import * as React from 'react';
import { IterativeNode } from './IterativeNode';
import { Category } from './Category';

const DEFAULT_NODE_NAME = 'Recursive node';

export interface IterativeTreeProps {}

export interface IterativeTreeState {
    categories: Category[];
}

export class IterativeTree extends React.PureComponent<
    IterativeTreeProps,
    IterativeTreeState
> {
    constructor(props: IterativeTreeProps) {
        super(props);

        this.state = {
            categories: [
                {
                    depth: 1,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        };
    }

    handleCategoryAdded = () => {
        this.setState(prevState => ({
            categories: [
                ...prevState.categories,
                { depth: 1, contents: DEFAULT_NODE_NAME }
            ]
        }));
    };

    render() {
        return (
            <div>
                {this.state.categories.map((category, i) => {
                    return (
                        <IterativeNode
                            onCategoryAdded={this.handleCategoryAdded}
                            key={i}
                            category={category}
                        />
                    );
                })}
            </div>
        );
    }
}
