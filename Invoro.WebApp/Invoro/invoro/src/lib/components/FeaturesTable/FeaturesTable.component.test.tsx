import React from 'react';
import FeaturesTableComponent from './FeaturesTable.component';
import Feature from '../../dataModel/Feature';
import Status from '../../dataModel/Status';
import { shallow, mount } from 'enzyme';
import FeatureCategory from '../../dataModel/FeaturesCategory';
import { debug } from 'util';

describe("FeaturesTable", () => {
    it("render one feature with the correct name", () => {

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

    it("render feature with the correct link as linkable", () => {

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

    it("render multiple features", () => {

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

    it("render voted features", () => {
        // Prepare
        let features: Feature[] = [new Feature("ID1", "NAME", Status.NotPlanned, "Link", new Date(), new Date()),
        new Feature("ID2", "NAME", Status.NotPlanned, "Link", new Date(), new Date())];
        let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];
        let featuresVoted: Set<string> = new Set<string>();
        featuresVoted.add("ID1");
        let voteHandle = (id: string) => { };
        let unvoteHandle = (id: string) => { };

        // Action
        let tableRows =
            mount(<FeaturesTableComponent
                featuresCategories={featuresCategories}
                featuresVoted={featuresVoted}
                featureVoteHandle={voteHandle}
                featureUnvoteHandle={unvoteHandle} />)
                .find(".feature-row");

        // Assert
        tableRows.forEach(row => {
            if (row.key() == "ID1") {
                let voteIcon = row.find("VoteIconComponent");
                expect(voteIcon.length).toBe(1);
            }
            if (row.key() == "ID2") {
                let unvoteIcon = row.find("UnvoteIconComponent");
                expect(unvoteIcon.length).toBe(1);
            }
        });
    });

    it("render with no voted features set", () => {
        // Prepare
        let features: Feature[] = [new Feature("ID1", "NAME", Status.NotPlanned, "Link", new Date(), new Date()),
        new Feature("ID2", "NAME", Status.NotPlanned, "Link", new Date(), new Date())];
        let featuresCategories: FeatureCategory[] = [new FeatureCategory("MyCategory", features)];
        let voteHandle = (id: string) => { };
        let unvoteHandle = (id: string) => { };

        // Action
        let unvoteIcons =
            mount(<FeaturesTableComponent
                featuresCategories={featuresCategories}
                featureVoteHandle={voteHandle}
                featureUnvoteHandle={unvoteHandle} />)
                .find("UnvoteIconComponent");

        console.log(unvoteIcons.debug());
        // Assert
        expect(unvoteIcons.length).toBe(2);
    });
});