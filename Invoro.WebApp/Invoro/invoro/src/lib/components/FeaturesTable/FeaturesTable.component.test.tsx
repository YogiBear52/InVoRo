import React from 'react';
import FeaturesTableComponent from './FeaturesTable.component';
import Feature from '../../dataModel/Feature';
import Status from '../../dataModel/Status';
import { shallow, mount, ReactWrapper } from 'enzyme';
import FeatureCategory from '../../dataModel/FeaturesCategory';
import { TableCell } from '@material-ui/core';

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
        mount(<FeaturesTableComponent
            featuresCategories={featuresCategories}
            featuresVoted={featuresVoted}
            featureVoteHandle={voteHandle}
            featureUnvoteHandle={unvoteHandle} />)
            .find(`#${features[0].id}`)
            .find(TableCell)
            .first()
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
        mount(<FeaturesTableComponent
            featuresCategories={featuresCategories}
            featuresVoted={featuresVoted}
            featureVoteHandle={voteHandle}
            featureUnvoteHandle={unvoteHandle} />)
            .find(`#${features[0].id}`)
            .find(TableCell)
            .first()
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
            .find(".featureRow")

    // Assert    
    expect(tableRows).toHaveLength(features.length);
});

describe("Order features", () => {
    let featuresVoted: Set<string> = new Set<string>();
    let voteHandle = (id: string) => { };
    let unvoteHandle = (id: string) => { };

    describe('with default comparer', () => {
        let expectedIdOrder: string[] = ["ID1", "ID2", "ID3"];
    
        it('already ordered - render alphabetically,', () => {

            // Prepare
            let features: Feature[] = [
                new Feature("ID1", "AFirst", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID2", "BSecond", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID3", "CThird", Status.NotPlanned, "Link", new Date(), new Date())];
            let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} />).
                    find("TableRow.featureRow");
            
            expectIdOrder(tableRows, expectedIdOrder);
        });

        it('scrambled - render alphabetically,', () => {

            // Prepare
            let features: Feature[] = [
                new Feature("ID2", "BSecond", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID1", "AFirst", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID3", "CThird", Status.NotPlanned, "Link", new Date(), new Date())];
            let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} />).
                    find("TableRow.featureRow");

            expectIdOrder(tableRows, expectedIdOrder);
        });
    })
    describe('with costume comparer', () => {
        let costumeFeaturesComparerReverse = (a: Feature, b: Feature): number => { return a.name.localeCompare(b.name) * (-1)};
        let expectedIdOrder: string[] = ["ID1", "ID2", "ID3"];

        it('already ordered - render alphabetically,', () => {

            // Prepare
            let features: Feature[] = [
                new Feature("ID3", "AThird", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID2", "BSecond", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID1", "CFirst", Status.NotPlanned, "Link", new Date(), new Date())];
            let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle}
                    featuresCompareFn = {costumeFeaturesComparerReverse} />).
                    find("TableRow.featureRow");
            
            expectIdOrder(tableRows, expectedIdOrder);
        });

        it('scrambled - render alphabetically,', () => {

            // Prepare
            let features: Feature[] = [
                new Feature("ID3", "AThird", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID2", "BSecond", Status.NotPlanned, "Link", new Date(), new Date()),
                new Feature("ID1", "CFirst", Status.NotPlanned, "Link", new Date(), new Date())];
            let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} 
                    featuresCompareFn = {costumeFeaturesComparerReverse} />).
                    find("TableRow.featureRow");

            expectIdOrder(tableRows, expectedIdOrder);
        });
    })

});

describe("Order categories", () => {

    let featuresVoted: Set<string> = new Set<string>();
    let voteHandle = (id: string) => { };
    let unvoteHandle = (id: string) => { };

    let featuresOfCategoryOne: Feature[] = [
        new Feature("ID1", "Name", Status.NotPlanned, "Link", new Date(), new Date())];
    let featuresOfCategoryTwo: Feature[] = [
        new Feature("ID2", "Name", Status.NotPlanned, "Link", new Date(), new Date())];
    let featuresOfCategoryThree: Feature[] = [
        new Feature("ID3", "Name", Status.NotPlanned, "Link", new Date(), new Date())];

    describe('with default comparer', () => {
        let expectedIdOrder: string[] = ["A - FirstCategory", "B - SecondCategory", "C - ThirdCategory"];
    
        it('already ordered - render alphabetically,', () => {
            // Prepare
            let featuresCategories: FeatureCategory[] = [
                new FeatureCategory("A - FirstCategory", featuresOfCategoryOne),
                new FeatureCategory("B - SecondCategory", featuresOfCategoryTwo),
                new FeatureCategory("C - ThirdCategory", featuresOfCategoryThree)
            ];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} />).
                    find("TableRow.categoryRow");
            
            expectIdOrder(tableRows, expectedIdOrder);
        });

        it('scrambled - render alphabetically,', () => {
            // Prepare
            let featuresCategories: FeatureCategory[] = [
                new FeatureCategory("B - SecondCategory", featuresOfCategoryTwo),
                new FeatureCategory("A - FirstCategory", featuresOfCategoryOne),
                new FeatureCategory("C - ThirdCategory", featuresOfCategoryThree)
            ];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} />).
                    find("TableRow.categoryRow");

            expectIdOrder(tableRows, expectedIdOrder);
        });
    })
    describe('with costume comparer', () => {
        let costumeCategoriesComparerReverse = (a: FeatureCategory, b: FeatureCategory): number =>
         { return a.name.localeCompare(b.name) * (-1)};
         let expectedIdOrder: string[] = ["C - FirstCategory", "B - SecondCategory", "A - ThirdCategory"];

        it('already ordered - render alphabetically,', () => {
            // Prepare
            let featuresCategories: FeatureCategory[] = [
                new FeatureCategory("C - FirstCategory", featuresOfCategoryThree),
                new FeatureCategory("B - SecondCategory", featuresOfCategoryTwo),
                new FeatureCategory("A - ThirdCategory", featuresOfCategoryOne)
            ];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle}
                    featuresCategoryCompareFn = {costumeCategoriesComparerReverse} />).
                    find("TableRow.categoryRow");
            
            expectIdOrder(tableRows, expectedIdOrder);
        });

        it('scrambled - render alphabetically,', () => {

            // Prepare
            let featuresCategories: FeatureCategory[] = [
                new FeatureCategory("B - SecondCategory", featuresOfCategoryTwo),
                new FeatureCategory("A - ThirdCategory", featuresOfCategoryOne),
                new FeatureCategory("C - FirstCategory", featuresOfCategoryThree)
            ];

            // Action
            let tableRows =
                mount(<FeaturesTableComponent 
                    featuresCategories={featuresCategories}
                    featuresVoted={featuresVoted}
                    featureVoteHandle={voteHandle}
                    featureUnvoteHandle={unvoteHandle} 
                    featuresCategoryCompareFn = {costumeCategoriesComparerReverse} />).
                    find("TableRow.categoryRow");

            expectIdOrder(tableRows, expectedIdOrder);
        });
    })

});

function expectIdOrder(tableRows: ReactWrapper, expectedNameOrder: string[]) {
    for (let i: number = 0; i < tableRows.length; i++) {
        expect(tableRows.at(i).prop('id')).toEqual(expectedNameOrder[i]);
    }
}
