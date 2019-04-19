import * as React from 'react';
import '../App.css';

export interface TreeNodeProps {}

export interface TreeNodeState {
    isEditing: boolean;
    contents: string;
    subNodes: string[];
}

const DEFAULT_NODE_NAME = 'Recursive node';

export class TreeNode extends React.PureComponent<
    TreeNodeProps,
    TreeNodeState
> {
    constructor(props: TreeNodeProps) {
        super(props);

        this.state = {
            contents: DEFAULT_NODE_NAME,
            isEditing: false,
            subNodes: []
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
        this.setState(prevState => ({
            subNodes: [...prevState.subNodes, DEFAULT_NODE_NAME]
        }));
    };

    render() {
        const { contents, isEditing } = this.state;

        return (
            <div className="tree-node">
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
                <div>
                    {this.state.subNodes.map((_subNode, i) => {
                        return <TreeNode key={i} />;
                    })}
                </div>
            </div>
        );
    }
}
