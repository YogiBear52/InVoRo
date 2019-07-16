import React from 'react';
import ReactDOM from 'react-dom';
import Invoro from './Invoro.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const fetchMock = (input: RequestInfo, init?: RequestInit) => new Promise<Response>(() => null);
  ReactDOM.render(<Invoro userIdentifier={"FakeUserIdentity"} fetchApi={fetchMock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Check all APIs