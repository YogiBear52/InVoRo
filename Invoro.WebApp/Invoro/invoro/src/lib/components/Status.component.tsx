import React from 'react';
import Chip from '@material-ui/core/Chip';
import withStyles from '@material-ui/core/styles/withStyles';
import { createStyles } from '@material-ui/core';
import { yellow, red, green, orange, lime } from '@material-ui/core/colors';
import Status from '../dataModel/Status';
import StatusToDisplayConverter from "../services/StatusToDisplayConverter.service";

interface StatusProps {
  status: Status,
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

class StatusComponent extends React.Component<StatusProps, {}> {
  private getStyle(status: Status): string {
    switch (status) {
      case (Status.NotPlanned):
        return this.props.classes.notPlannedStatus;
      case (Status.Planned):
        return this.props.classes.plannedStatus;
      case (Status.InProgress):
        return this.props.classes.inProgressStatus;
      case (Status.ReadySoon):
        return this.props.classes.readySoonStatus;
      case (Status.Released):
        return this.props.classes.releasedStatus;
      default:
        throw new Error("Bug - probably unhandled new Status");
    }
  }

  private getLabel(status: Status): string {
    return StatusToDisplayConverter.getDisplayName(status);
  }

  render() {
    return (
      <div>
        <Chip className={this.getStyle(this.props.status)} label={this.getLabel(this.props.status)} variant="outlined" />
      </div>
    );
  }
}

export default withStyles(chipStyle)(StatusComponent)