import React from 'react';
import Invoro from './lib/components/Invoro/Invoro.component';

export default class App extends React.Component {

  state = { userIdentifier: "AUserIdentity" };

  render() {
    return <Invoro userIdentifier={this.state.userIdentifier} />;
  }
}