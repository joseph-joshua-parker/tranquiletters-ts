

import WithPanel from './components/withPanel/withPanel';

import 'bulma/css/bulma.min.css';
import './styles.css';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';
import VerbalParameters from './components/VerbalParameters/VerbalParameters';
import usePatternModelSelector from './state/usePatternModelSelector';
import {speak, init} from './audio/speechSynthesis';
import { STIM_TYPES } from './shared/models/stimTypes';

function App() {
  init();
  const [patternModel, sessionMinutes] = usePatternModelSelector();
  const sessionTime = sessionMinutes*60*1000;

  let sessionInterval: NodeJS.Timer | undefined;
  let timeElapsed = 0;

  const start = ()=>{
    sessionInterval = setInterval(()=>{
      console.log(timeElapsed)
      if(timeElapsed >= sessionTime) clearInterval(sessionInterval);
      
      const unit = patternModel[timeElapsed/1000];
      if(unit.type == STIM_TYPES.Verbal){
        console.log(unit.payload);
        speak(unit.payload);
      }


      timeElapsed += 1000;
    },1000)
  }

  return (
    
      <div>
        <WithPanel>
          <VerbalParameters/>  
        </WithPanel> 
        <StimPatternModel model={patternModel}/>
        <button onClick={start} className='button is-small'>Start</button>
      </div>

  );
}

export default App;
