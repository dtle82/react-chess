import React from 'react';
import ReactDOM from 'react-dom';
import side-notation from './side-notation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<side-notation />, div);
  ReactDOM.unmountComponentAtNode(div);
});
