import * as React from 'react';
import { IterativeNode } from './IterativeNode';
import { Category } from './Category';
import { DEFAULT_NODE_NAME } from '../constants';

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
                    id: 1,
                    depth: 0,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        };
    }

    handleCategoryAdded = (targetCategoryId: number) => {
        //TODO: find parent category, merge it to the list with slice & concat
        //TODO: extract the merge to separate func
        const targetCategoryIndex = this.state.categories.findIndex(
            c => c.id === targetCategoryId
        );
        if (targetCategoryIndex < 0) {
            return;
        }

        const targetCategory = this.state.categories[targetCategoryIndex];

        this.setState(prevState => ({
            categories: [
                ...prevState.categories,
                {
                    id: prevState.categories.length + 1,
                    depth: ++targetCategory.depth,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        }));
    };

    render() {
        return (
            <div>
                {this.state.categories.map((category, i) => {
                    return (
                        <IterativeNode
                            key={i}
                            onCategoryAdded={this.handleCategoryAdded}
                            id={category.id}
                            depth={category.depth}
                        />
                    );
                })}
            </div>
        );
    }
}

const createCategory = (id: number, baseDepth: number): Category => {
    return {
        id: ++id,
        depth: ++baseDepth,
        contents: DEFAULT_NODE_NAME
    };
};
