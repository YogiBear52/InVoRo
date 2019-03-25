import SimpleTable from './lib/SimpleTable';
import React from 'react';
import Feature from './lib/dataModel/Feature';
import FeaturesApi from './lib/services/FeaturesApi';

interface IAppSate {
  features: Feature[] | null;
}
export default class App extends React.Component {

  private featuresApi: FeaturesApi;

   constructor(props: any) {
    super(props);
    this.featuresApi = new FeaturesApi();
   }

  public async componentDidMount() {
     // TODO: Handle Failure
     let featuresResult: Feature[] = await this.featuresApi.getFeatures();
     this.setState({features:featuresResult});
  }

  state: IAppSate = {features: null}

  render() {
    if (this.state.features !== null){
    return <SimpleTable features = {this.state.features} />;
      }
    else {
        return <div>Loading..</div>;
      }
    }
}