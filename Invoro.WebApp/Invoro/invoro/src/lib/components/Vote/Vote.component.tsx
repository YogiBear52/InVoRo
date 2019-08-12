import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import VoteIconComponent from '../VoteIcons/VoteIcon.Component';
import UnvoteIconComponent from '../VoteIcons/UnvoteIcon.Component';

interface VoteProps {
    isVoted: Boolean;
    voteHandle(): void;
    unvoteHandle(): void;
}

class VoteComponent extends React.Component<VoteProps> {
    private handleOnClick() {
        if (this.props.isVoted) {
            this.props.unvoteHandle();
        }
        else {
            this.props.voteHandle();
        }
    }
    render() {
        return (
            <IconButton color="primary" onClick={() => this.handleOnClick()} aria-label="Vote for the feature">
                {this.props.isVoted ? <VoteIconComponent /> : <UnvoteIconComponent />}
            </IconButton>
        );
    }
}

export default VoteComponent