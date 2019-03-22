import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Status from "./Status";
import { RowDataModel } from "./RowDataModel";

interface SimpleTableProps {
  rowsData: RowDataModel[]
}

export default class SimpleTable extends React.Component<SimpleTableProps, {}> {
  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>FEATURE</TableCell>
              <TableCell align="right">NOT PLANNED</TableCell>
              <TableCell align="right">PLANNED</TableCell>
              <TableCell align="right">IN PROGRESS</TableCell>
              <TableCell align="right">READY SOON</TableCell>
              <TableCell align="right">RELEASED</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.rowsData.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.featureName}
                </TableCell>
                <TableCell align="right"><Status label={row.col1} /></TableCell>
                <TableCell align="right"><Status label={row.col2} /></TableCell>
                <TableCell align="right"><Status label={row.col3} /></TableCell>
                <TableCell align="right"><Status label={row.col4} /></TableCell>
                <TableCell align="right"><Status label={row.col5} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}