

import WithPanel from './components/withPanel/withPanel';

import 'bulma/css/bulma.min.css';
import './styles.css';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';
import VerbalParameters from './components/VerbalParameters/VerbalParameters';
import usePatternModelSelector from './state/usePatternModelSelector';
import useLoop, { PLAYBACK_STATE } from './useLoop';
import { PatternUnit } from './shared/models/patternUnit';
import useSideBar from './SideBar';
import { STIM_TYPES } from './shared/models/stimTypes';
import FeedBackParameters from './FeedbackParameters';


function App() {
  
  const  [patternModel, sessionMinutes, selectToken] = (usePatternModelSelector() as [PatternUnit[], number, ()=>string])
  const {start, cancel, pause, resume, playbackState} = useLoop(patternModel, sessionMinutes, selectToken)
  const {stimType, SideBar} = useSideBar();

  const startCancel = <div>
    { (playbackState == PLAYBACK_STATE.Waiting)
      ?<button onClick={start} className='button is-small'>Start</button>
      :<button onClick={cancel} className='button is-small'>Cancel</button>
    }
  </div>

  const pauseResume = <div>
    { (playbackState != PLAYBACK_STATE.Paused)
    ? <button onClick={pause} className='button is-small'>Pause</button>
    : <button onClick={resume} className='button is-small'>Resume</button>
    }
  </div>

  const StimParams = (()=> {
    switch(stimType){
      case STIM_TYPES.Verbal: return VerbalParameters
      case STIM_TYPES.Feedback: return FeedBackParameters
      default: return VerbalParameters
    }
  })()

  return (

      <div>
        <div className="columns is-mobile">
          <SideBar/>
          <div className="column">
            <WithPanel>
              <StimParams/>
            </WithPanel>
          </div>
        </div>
        <div>
          <StimPatternModel model={patternModel}/>
            {startCancel}
            {!(playbackState == PLAYBACK_STATE.Waiting) &&  pauseResume}
        </div>
      </div>

  );
}

export default App;
