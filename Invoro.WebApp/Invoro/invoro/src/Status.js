import React from 'react';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

class Status extends React.Component {
  
  chipStyle = {
    backgroundColor: red[500]
  };


  render() {
    return(
    <div>
        {this.props.label && <Chip label={this.props.label} style={this.chipStyle} variant="outlined" />}
    </div>
    );
  }
}

export default Status;