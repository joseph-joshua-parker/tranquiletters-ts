import React from 'react';

import WithPanel from './components/withPanel/withPanel';

import 'bulma/css/bulma.min.css';
import './styles.css';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';
import VerbalParameters from './components/VerbalParameters/VerbalParameters';

function App() {
  return (
    
      <div>
        <WithPanel>
          <VerbalParameters/>  
        </WithPanel> 
        <StimPatternModel />
      </div>

  );
}

export default App;
