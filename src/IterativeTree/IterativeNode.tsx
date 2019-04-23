import * as React from 'react';
import '../App.css';
import {
    DEFAULT_NODE_NAME,
    DEFAULT_CATEGORY_LEVEL_OFFSET_PX
} from '../constants';

export interface IterativeNodeProps {
    id: string;
    level: number;
    onCategoryAdded: (categoryId: string) => void;
}

export interface IterativeNodeState {
    contents: string;
    isEditing: boolean;
}

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
        this.props.onCategoryAdded(this.props.id);
    };

    render() {
        const { isEditing, contents } = this.state;
        const { level } = this.props;

        return (
            <div
                style={{
                    paddingLeft: DEFAULT_CATEGORY_LEVEL_OFFSET_PX * level
                }}
            >
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
            </div>
        );
    }
}
