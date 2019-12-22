import React from 'react';
import { hot } from 'react-hot-loader/root';
import Layout from './components/Layout';
import DragAreaMac from './components/DragAreaMac';

import './style.css';

function App() {
  return (
    <div>
      <DragAreaMac />
      <Layout />
    </div>
  );
}

export default hot(App);
