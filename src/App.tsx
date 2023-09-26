import React from 'react';
import VerbalParameterPanel from './components/VerbalParameterPanel/ParameterPanel';

import 'bulma/css/bulma.min.css';
import './styles.css';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';

function App() {
  return (
    
      <div>
        <VerbalParameterPanel/>
        <StimPatternModel />
      </div>

  );
}

export default App;
