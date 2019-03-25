import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import StatusComponent from "./StatusComponent";
import Status from "./dataModel/Status";
import Feature from "./dataModel/Feature";

interface SimpleTableProps {
  features: Feature[]
}

export default class SimpleTable extends React.Component<SimpleTableProps, {}> {
  private getTableCell(tableCellStatus: Status,feature: Feature) {
    if(tableCellStatus === feature.status){
      return <TableCell align="right"><StatusComponent status={tableCellStatus} /></TableCell> 
    }
    else{
      return <TableCell align="right"></TableCell>
    }
  }

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
            {this.props.features.map(feature => (
              <TableRow key={feature.id}>
                <TableCell component="th" scope="row">
                  {feature.name}
                </TableCell>
                {this.getTableCell(Status.NotPlanned,feature)}
                {this.getTableCell(Status.Planned,feature)}
                {this.getTableCell(Status.InProgress,feature)}
                {this.getTableCell(Status.ReadySoon,feature)}
                {this.getTableCell(Status.Released,feature)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}