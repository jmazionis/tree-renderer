import * as React from 'react';
import { IterativeNode } from './IterativeNode';
import { DEFAULT_NODE_NAME } from '../constants';
import { generateId } from '../utils';

interface Category {
    id: string;
    parentId?: string;
    level: number;
    contents: string;
}


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
                    parentId: 'root',
                    level: 1,
                    contents: DEFAULT_NODE_NAME
                }
            ]
        };
    }

    handleCategoryAdded = (targetCategoryId: string) => {
        const lastChildCategoryIndex = _getLastChildCategoryIndex(
            targetCategoryId,
            this.state.categories
        );
        const targetCategoryIndex = this.state.categories.findIndex(
            c => c.id === targetCategoryId
        );

        if (lastChildCategoryIndex < 0 || targetCategoryIndex < 0) {
            return;
        }

        const targetCategory = this.state.categories[targetCategoryIndex];

        this.setState(prevState => ({
            categories: [
                ...prevState.categories.slice(0, lastChildCategoryIndex + 1),
                {
                    id: generateId(),
                    parentId: targetCategory.id,
                    level: targetCategory.level + 1,
                    contents: DEFAULT_NODE_NAME
                },
                ...prevState.categories.slice(lastChildCategoryIndex + 1)
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
                            id={category.id}
                            onCategoryAdded={this.handleCategoryAdded}
                            level={category.level}
                        />
                    );
                })}
            </div>
        );
    }
}

// retrieves the index of a node in the list to witch the new one will be appended
const _getLastChildCategoryIndex = (
    targetParentId: string,
    categories: Category[]
): number => {
    for (let i = categories.length - 1; i >= 0; i--) {
        if (
            categories[i].parentId === targetParentId ||
            categories[i].id === targetParentId
        ) {
            return i;
        }
    }
    return -1;
};
