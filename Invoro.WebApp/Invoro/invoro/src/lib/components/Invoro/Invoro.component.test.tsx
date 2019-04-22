import React from 'react';
import ReactDOM from 'react-dom';
import Invoro from './Invoro.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Invoro userIdentifier="FakeUserIdentity" />, div);
  ReactDOM.unmountComponentAtNode(div);
});