import React from 'react';
import FeaturesCategory from '../../dataModel/FeaturesCategory'
import FeaturesApi from '../../services/FeaturesApi.service';
import FeaturesTableComponent from '../FeaturesTable/FeaturesTable.component'

interface InvoroState {
    featuresCategories: FeaturesCategory[] | null;
}

interface InvoroProps {
    userIdentifier: string;
    fetchApi: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export default class Invoro extends React.Component<InvoroProps> {
    private featuresApi: FeaturesApi;

    constructor(props: any) {
        super(props);
        this.featuresApi = new FeaturesApi(props.userIdentifier, props.fetchApi);
    }

    state: InvoroState = { featuresCategories: null }

    public async componentDidMount() {
        // TODO: Handle Failure
        // TODO: not best practice anymore
        let featuresResult: FeaturesCategory[] = await this.featuresApi.getFeatures();
        this.setState({ featuresCategories: featuresResult });
    }

    render() {
        if (this.state.featuresCategories !== null) {
            return <FeaturesTableComponent featuresCategories={this.state.featuresCategories} />;
        }
        else {
            return <div>Loading..</div>;
        }
    }
}