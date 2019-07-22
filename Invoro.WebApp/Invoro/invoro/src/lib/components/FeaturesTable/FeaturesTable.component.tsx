import React, { ReactElement } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import StatusComponent from "../Status/Status.component";
import VoteComponent from "../Vote/Vote.component";
import Status from "../../dataModel/Status";
import Feature from "../../dataModel/Feature";
import FeaturesCategory from "../../dataModel/FeaturesCategory";

interface FeaturesTableProps {
  featuresCategories: FeaturesCategory[];
  featuresVoted: Set<string>;
  featureVoteHandle(featureId: string): void;
  featureUnvoteHandle(featureId: string): void;
}

export default class FeaturesTableComponent extends React.Component<FeaturesTableProps> {
  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            {this.CreateTableHeaderRow()}
          </TableHead>
          <TableBody>
            {this.props.featuresCategories.map(category =>
              [this.CreateCategoryRow(category),
              this.CreateFeatureRow(category.features)])}
          </TableBody>
        </Table>
      </Paper>
    );
  }

  private CreateTableHeaderRow(): JSX.Element {
    return <TableRow>
      <TableCell>FEATURE</TableCell>
      <TableCell align="left">NOT PLANNED</TableCell>
      <TableCell align="left">PLANNED</TableCell>
      <TableCell align="left">IN PROGRESS</TableCell>
      <TableCell align="left">READY SOON</TableCell>
      <TableCell align="left">RELEASED</TableCell>
    </TableRow>
  }

  private CreateCategoryRow(category: FeaturesCategory): JSX.Element {
    return <TableRow key={category.name}>
      <TableCell colSpan={7} style={{ fontWeight: 'bold' }}>
        {category.name}
      </TableCell>
    </TableRow>;
  }

  private CreateFeatureRow(features: Feature[]): JSX.Element[] {
    return features.map(feature =>
      <TableRow key={feature.id} className="feature-row">
        <TableCell style={{ paddingLeft: '2%' }}>
          {this.getLinkableFeatureTitle(feature)}
        </TableCell>
        {this.getTableCell(Status.NotPlanned, feature)}
        {this.getTableCell(Status.Planned, feature)}
        {this.getTableCell(Status.InProgress, feature)}
        {this.getTableCell(Status.ReadySoon, feature)}
        {this.getTableCell(Status.Released, feature)}
        {this.getVoteCell(feature)}
      </TableRow >);
  }

  private getLinkableFeatureTitle(feature: Feature): JSX.Element {
    if (feature.link === null) {
      return <span>{feature.name}</span>
    }
    else {
      return (
        <a href={feature.link}>
          <span>{feature.name}</span>
        </a>)
    }
  }

  private getVoteCell(feature: Feature) {
    if (feature.status === Status.Released) {
      return <TableCell align="left"></TableCell>
    }

    return <TableCell align="left">
      <VoteComponent
        isVoted={this.props.featuresVoted.has(feature.id)}
        voteHandle={() => this.props.featureVoteHandle(feature.id)}
        unvoteHandle={() => this.props.featureUnvoteHandle(feature.id)} />
    </TableCell>
  }

  private getTableCell(tableCellStatus: Status, feature: Feature) {
    if (tableCellStatus === feature.status) {
      return <TableCell align="left"><StatusComponent status={tableCellStatus} /></TableCell>
    }
    else {
      return <TableCell align="left"></TableCell>
    }
  }
}