import React from 'react';
import './App.scss';
import Navigation from './shared/components/layout/navigation/navigation';
import Routing from './shared/components/layout/routing/routing';

const App = () => {
  return (
    <div className='App position-relative'>
      <Navigation />
      <Routing />
    </div>
  );
};

export default App;
