import RowDataModel from './lib/RowDataModel';
import SimpleTable from './lib/SimpleTable';
import React from 'react';

let id: number = 0;
function createData(featureName: string, isNotPlanned: boolean, isPlanned: boolean, isInProgress: boolean, isReadySoon: boolean, isReleased: boolean): RowDataModel {
  id += 1;
  return new RowDataModel(id,
    featureName,
    isNotPlanned ? "NOT PLANNED" : "",
    isPlanned ? "PLANNED" : "",
    isInProgress ? "IN PROGRESS" : "",
    isReadySoon ? "READY SOON" : "",
    isReleased ? "RELEASED" : "");
}

export default class App extends React.Component {
  rowsData: RowDataModel[] = [
    createData('Feture 1', true, false, false, false, false),
    createData('Feture 2', false, true, false, false, false),
    createData('Feture 3', false, false, true, false, false),
    createData('Feture 4', false, false, false, true, false),
    createData('Feture 5', false, false, false, false, true)
  ];

  render() {
    return (
      <SimpleTable rowsData = {this.rowsData} />
    );
  }
}