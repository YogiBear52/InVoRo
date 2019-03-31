import React from 'react';
import FeaturesTableComponent from './FeaturesTable.component';
import Feature from '../../dataModel/Feature';
import Status from '../../dataModel/Status';
import { TableRow, TableCell, Paper, Table, TableBody } from '@material-ui/core';
import { shallow } from 'enzyme';

it('render one feature with the correct name', () => {

    // Peraper
    const name :string = "MyFeatureName";
    let features :Feature[] = [new Feature("ID",name,Status.NotPlanned,"LINK")];

    // Action
    let result = 
        shallow(<FeaturesTableComponent features={features} />)
        .find(Paper).shallow()
        .find(Table).shallow()
        .find(TableBody).shallow()
        .find(TableRow).shallow()
        .find(TableCell).first().shallow()
        .find('a');

    // Assert
     expect(result.text()).toEqual(name);
});

it('render feature with the correct link as linkable', () => {

    // Peraper
    const link :string = "MyLink";
    let features :Feature[] = [new Feature("ID","NAME",Status.NotPlanned,link)];

    // Action
    let result = 
        shallow(<FeaturesTableComponent features={features} />)
        .find(Paper).shallow()
        .find(Table).shallow()
        .find(TableBody).shallow()
        .find(TableRow).shallow()
        .find(TableCell).first().shallow()
        .find('a');

    // Assert    
    expect(result.props().href).toEqual(link);
});


it('render multiple features', () => {

    // Peraper
    let features :Feature[] = [ new Feature("ID1","NAME",Status.NotPlanned,"Link"),
                                new Feature("ID2","NAME",Status.NotPlanned,"Link")];

    // Action
    let tableRows = 
        shallow(<FeaturesTableComponent features={features} />)
        .find(Paper).shallow()
        .find(Table).shallow()
        .find(TableBody).shallow()
        .find(TableRow)

    // Assert    
    expect(tableRows).toHaveLength(features.length);
});