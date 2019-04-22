import * as React from 'react';
import { IterativeNode } from './IterativeNode';
import { Category } from './Category';
import { DEFAULT_NODE_NAME } from '../constants';
import { generateId } from '../utils';

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
                    id: generateId(),
                    level: 0,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        };
    }

    handleCategoryAdded = (targetCategoryId: string) => {
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
                    id: generateId(),
                    level: ++targetCategory.level,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        }));
    };

    render() {
        return (
            <div>
                {this.state.categories.map(category => {
                    return (
                        <IterativeNode
                            key={category.id}
                            onCategoryAdded={this.handleCategoryAdded}
                            id={category.id}
                            level={category.level}
                        />
                    );
                })}
            </div>
        );
    }
}

const createChildCategory = (id: string, baseLevel: number): Category => {
    return {
        id,
        level: ++baseLevel,
        contents: DEFAULT_NODE_NAME
    };
};
