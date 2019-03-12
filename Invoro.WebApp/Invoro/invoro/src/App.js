import React from 'react';
import PropTypes, { string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import red from '@material-ui/core/colors/red';
import Status from './Status';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const status = {
  NOTPLANNED: "not planned",
  PLANNED: "planned",
  INPROGRESS: "in progress",
  READYSOON: "ready soon",
  RELEASED: "released"
}

let id = 0;
function createData(featureName, isNotPlanned, isPlanned, isInProgress, isReadySoon, isReleased) {
  id += 1;
  return {id, featureName, isNotPlanned, isPlanned, isInProgress, isReadySoon, isReleased};
}

const rows = [
  createData('Feture 1', true, false, false, false, false),
  createData('Feture 2', false, true, false, false, false),
  createData('Feture 3', false, false, true, false, false),
  createData('Feture 4', false, false, false, true, false),
  createData('Feture 5', false, false, false, false, true)
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>FEATURE</TableCell>
            <TableCell align="right">NOT PLANNED</TableCell>
            <TableCell align="right">PLANNED</TableCell>
            <TableCell align="right">IN PROGRESS</TableCell>
            <TableCell align="right">READY SOOM</TableCell>
            <TableCell align="right">RELEASED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.featureName}
              </TableCell>
              <TableCell align="right"><Status label={row.isNotPlanned? status.NOTPLANNED : null}/></TableCell>
              <TableCell align="right"><Status label={row.isPlanned? status.PLANNED : null}/></TableCell>
              <TableCell align="right"><Status label={row.isInProgress? status.INPROGRESS : null}/></TableCell>
              <TableCell align="right"><Status label={row.isReadySoon? status.READYSOON : null}/></TableCell>
              <TableCell align="right"><Status label={row.isReleased? status.RELEASED : null}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
