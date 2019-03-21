import React, { ReactComponentElement } from 'react';
import Chip from '@material-ui/core/Chip';
import red from '@material-ui/core/colors/red';
import withStyles, { CSSProperties } from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';

interface StatusProps {
  label: string,
  classes: {
    status: string
  }
}

const chipStyle: Record<"status", CSSProperties> = createStyles({
  status: {
    backgroundColor: red[500]
  }
});

class Status extends React.Component<StatusProps, {}> {
  render() {
    return (
      <div>
        {this.props.label && <Chip  className={this.props.classes.status} label={this.props.label} variant="outlined" />}
      </div>
    );
  }
}

export default withStyles(chipStyle)(Status)