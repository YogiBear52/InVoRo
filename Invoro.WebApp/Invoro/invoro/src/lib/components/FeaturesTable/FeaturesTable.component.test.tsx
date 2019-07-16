import React from 'react';
import FeaturesTableComponent from './FeaturesTable.component';
import Feature from '../../dataModel/Feature';
import Status from '../../dataModel/Status';
import { shallow } from 'enzyme';
import FeatureCategory from '../../dataModel/FeaturesCategory';

it('render one feature with the correct name', () => {

    // Prepare
    const name: string = "MyFeatureName";
    let features: Feature[] = [new Feature("ID", name, Status.NotPlanned, "LINK", new Date(), new Date())];
    let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];
    let featuresVoted: Set<string> = new Set<string>();
    let voteHandle = (id: string) => { };
    let unvoteHandle = (id: string) => { };

    // Action
    let result =
        shallow(<FeaturesTableComponent
            featuresCategories={featuresCategories}
            featuresVoted={featuresVoted}
            featureVoteHandle={voteHandle}
            featureUnvoteHandle={unvoteHandle} />)
            .find(".feature-row").shallow()
            .find("span");

    // Assert
    expect(result.text()).toEqual(name);
});

it('render feature with the correct link as linkable', () => {

    // Prepare
    const link: string = "MyLink";
    let features: Feature[] = [new Feature("ID", "NAME", Status.NotPlanned, link, new Date(), new Date())];
    let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];
    let featuresVoted: Set<string> = new Set<string>();
    let voteHandle = (id: string) => { };
    let unvoteHandle = (id: string) => { };

    // Action
    let result =
        shallow(<FeaturesTableComponent
            featuresCategories={featuresCategories}
            featuresVoted={featuresVoted}
            featureVoteHandle={voteHandle}
            featureUnvoteHandle={unvoteHandle} />)
            .find(".feature-row").shallow()
            .find('a');

    // Assert    
    expect(result.props().href).toEqual(link);
});


it('render multiple features', () => {

    // Prepare
    let features: Feature[] = [new Feature("ID1", "NAME", Status.NotPlanned, "Link", new Date(), new Date()),
    new Feature("ID2", "NAME", Status.NotPlanned, "Link", new Date(), new Date())];
    let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];
    let featuresVoted: Set<string> = new Set<string>();
    let voteHandle = (id: string) => { };
    let unvoteHandle = (id: string) => { };

    // Action
    let tableRows =
        shallow(<FeaturesTableComponent
            featuresCategories={featuresCategories}
            featuresVoted={featuresVoted}
            featureVoteHandle={voteHandle}
            featureUnvoteHandle={unvoteHandle} />)
            .find(".feature-row");

    // Assert    
    expect(tableRows).toHaveLength(features.length);
});