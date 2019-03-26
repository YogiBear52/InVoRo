import React from 'react';
import ReactDOM from 'react-dom';
import Invoro from './Invoro.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Invoro />, div);
  ReactDOM.unmountComponentAtNode(div);
});
