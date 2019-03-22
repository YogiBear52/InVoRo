import React, { ReactComponentElement } from 'react';
import Chip from '@material-ui/core/Chip';
import withStyles, { CSSProperties } from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import { yellow, red, green, orange, lime } from '@material-ui/core/colors';

interface StatusProps {
  label: string,
  classes: {
    notPlannedStatus: string,
    plannedStatus: string,
    inProgressStatus: string,
    readySoonStatus: string,
    releasedStatus: string
  }
}

const chipStyle = createStyles({
  notPlannedStatus: {
    backgroundColor: red[500]
  },
  plannedStatus: {
    backgroundColor: orange[500]
  },
  inProgressStatus: {
    backgroundColor: yellow[500]
  },
  readySoonStatus: {
    backgroundColor: lime[500]
  },
  releasedStatus: {
    backgroundColor: green[500]
  }
});

class Status extends React.Component<StatusProps, {}> {
  private getStyle(label: string): string {
    switch (label) {
      case ("NOT PLANNED"):
        return this.props.classes.notPlannedStatus;
      case ("PLANNED"):
        return this.props.classes.plannedStatus;
      case ("IN PROGRESS"):
        return this.props.classes.inProgressStatus;
      case ("READY SOON"):
        return this.props.classes.readySoonStatus;
      case ("RELEASED"):
        return this.props.classes.releasedStatus;
    }

    throw new Error("An unknown status");
  }

  render() {
    return (
      <div>
        {this.props.label && <Chip className={this.getStyle(this.props.label)} label={this.props.label} variant="outlined" />}
      </div>
    );
  }
}

export default withStyles(chipStyle)(Status)