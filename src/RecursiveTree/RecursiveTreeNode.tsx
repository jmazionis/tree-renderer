import * as React from 'react';
import '../App.css';
import {
    DEFAULT_NODE_NAME,
    DEFAULT_CATEGORY_LEVEL_OFFSET_PX
} from '../constants';

export interface RecursiveTreeNodeProps {}

export interface RecursiveTreeNodeState {
    isEditing: boolean;
    contents: string;
    subNodes: string[];
}

export class RecursiveTreeNode extends React.PureComponent<
    RecursiveTreeNodeProps,
    RecursiveTreeNodeState
> {
    constructor(props: RecursiveTreeNodeProps) {
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
            <div style={{ paddingLeft: DEFAULT_CATEGORY_LEVEL_OFFSET_PX }}>
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

                <a className="tree-node__control" onClick={this.handleAddClick}>
                    Add new
                </a>
                <div>
                    {this.state.subNodes.map((_subNode, i) => {
                        return <RecursiveTreeNode key={i} />;
                    })}
                </div>
            </div>
        );
    }
}
