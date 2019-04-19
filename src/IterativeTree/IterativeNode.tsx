import * as React from 'react';
import '../App.css';
import { Category } from './Category';

export interface IterativeNodeProps {
    category: Category;
    onCategoryAdded: () => void;
}

export interface IterativeNodeState {
    contents: string;
    isEditing: boolean;
}

const DEFAULT_NODE_NAME = 'Iterative node';

export class IterativeNode extends React.PureComponent<
    IterativeNodeProps,
    IterativeNodeState
> {
    constructor(props: IterativeNodeProps) {
        super(props);

        this.state = {
            contents: DEFAULT_NODE_NAME,
            isEditing: false
        };
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            contents: e.target.value
        });
    };

    handleEditClick = () => {
        this.setState({ isEditing: true });
    };

    handleConfirmClick = () => {
        this.setState({ isEditing: false });
    };

    handleAddClick = () => {
        this.props.onCategoryAdded();
    };

    render() {
        const { isEditing, contents } = this.state;
        const { category } = this.props;

        return (
            <div style={{ paddingLeft: `${25 * category.depth}` }}>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            onChange={this.handleInputChange}
                            value={this.state.contents}
                        />
                        <a
                            className="tree-node__control"
                            onClick={this.handleConfirmClick}
                        >
                            Confirm
                        </a>
                    </>
                ) : (
                    <>
                        <span>{contents}</span>
                        <a
                            className="tree-node__control"
                            onClick={this.handleEditClick}
                        >
                            Edit
                        </a>
                    </>
                )}

                <a
                    className="tree-node tree-node__control"
                    onClick={this.handleAddClick}
                >
                    Add new
                </a>
                {/* <div>
                    {this.state.subNodes.map((_subNode, i) => {
                        return <IterativeNode key={i} />;
                    })}
                </div> */}
            </div>
        );
    }
}
