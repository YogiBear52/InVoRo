import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

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
                {this.props.isVoted ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
        );
    }
}

export default VoteComponent