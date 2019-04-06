import React from 'react';
import Feature from '../../dataModel/Feature'
import FeaturesApi from '../../services/FeaturesApi.service';
import FeaturesTableComponent from '../FeaturesTable/FeaturesTable.component'

interface InvoroState{
    features: Feature[] | null;
}

interface InvoroProps{
    userIdentifier: string;
}

export default class Invoro extends React.Component<InvoroProps> {
    private featuresApi: FeaturesApi;

    constructor(props: any) {
     super(props);
     this.featuresApi = new FeaturesApi(props.userIdentifier);
    }

   state: InvoroState = {features: null}
 
   public async componentDidMount() {
      // TODO: Handle Failure
      let featuresResult: Feature[] = await this.featuresApi.getFeatures();
      this.setState({features:featuresResult});
   }
 
    render(){
        if (this.state.features !== null){
            return <FeaturesTableComponent features = {this.state.features} />;
              }
            else {
                return <div>Loading..</div>;
              }
    }
}