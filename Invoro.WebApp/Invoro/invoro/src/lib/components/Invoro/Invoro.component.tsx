import React from 'react';
import FeaturesCategory from '../../dataModel/FeaturesCategory'
import FeaturesApi from '../../services/FeaturesApi.service';
import FeaturesTableComponent from '../FeaturesTable/FeaturesTable.component'

interface InvoroState {
    featuresCategories: FeaturesCategory[] | null;
    featuresVoted: Set<string>;
}

interface InvoroProps {
    userIdentifier: string;
}

export default class Invoro extends React.Component<InvoroProps> {
    private featuresApi: FeaturesApi;

    constructor(props: any) {
        super(props);
        this.featuresApi = new FeaturesApi(props.userIdentifier, fetch.bind(window));
    }

    state: InvoroState = {
        featuresCategories: null,
        featuresVoted: new Set<string>()
    }

    public async componentDidMount() {
        // TODO: Handle Failure
        // TODO: not best practice anymore
        let featuresResult: FeaturesCategory[] = await this.featuresApi.getFeatures();
        let featuresVotedResult: Set<string> = await this.featuresApi.getVotedFeaturesByUser();

        this.setState({ featuresCategories: featuresResult, featuresVoted: featuresVotedResult });
    }

    render() {
        if (this.state.featuresCategories !== null && this.state.featuresVoted != null) {
            return <FeaturesTableComponent
                featuresCategories={this.state.featuresCategories}
                featuresVoted={this.state.featuresVoted}
                featureVoteHandle={(featureId) => this.voteToFeature(featureId)}
                featureUnvoteHandle={(featureId) => this.unvoteToFeature(featureId)} />;
        }
        else {
            return <div>Loading..</div>;
        }
    }

    private async voteToFeature(featureId: string): Promise<void> {
        let featuresVoted: Set<string> = this.state.featuresVoted;
        await this.featuresApi.voteToFeature(featureId);
        featuresVoted.add(featureId);
        this.setState({ featuresVoted: featuresVoted });
    }

    private async unvoteToFeature(featureId: string): Promise<void> {
        let featuresVoted: Set<string> = this.state.featuresVoted;
        await this.featuresApi.unvoteToFeature(featureId);
        featuresVoted.delete(featureId);
        this.setState({ featuresVoted: featuresVoted });
    }
}