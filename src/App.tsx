import { useState } from 'react';

//CSS
import 'bulma/css/bulma.min.css';
import './styles.css';

//hooks
import usePatternModelSelector from './state/usePatternModelSelector';
import useLoop, { PLAYBACK_STATE } from './useLoop';

//models & enums
import { PatternUnit } from './shared/models/patternUnit';
import { STIM_TYPES } from './shared/models/stimTypes';

//components
import SideBar from './SideBar';
import {
  TokenParameters, 
  SoundFXParameters,
  FeedBackParameters,
  AmbienceParameters,
  NormalRhythmParameters,
  PolyRhythmParameters,

  WithPanel
} from './components/ParameterPanels/index';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';




function App() {
  
  const  [patternModel, sessionMinutes, selectToken] = (usePatternModelSelector() as [PatternUnit[], number, ()=>string])
  const {start, cancel, pause, resume, playbackState} = useLoop(patternModel, sessionMinutes, selectToken)
  const [stimType, setStimType] = useState<STIM_TYPES>(STIM_TYPES.Feedback);


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
      case STIM_TYPES.Token: return TokenParameters
      case STIM_TYPES.Feedback: return FeedBackParameters
      case STIM_TYPES.SoundFX: return SoundFXParameters
      case STIM_TYPES.Ambience: return AmbienceParameters
      case STIM_TYPES.NormalRhythm: return NormalRhythmParameters
      case STIM_TYPES.PolyRhythm: return PolyRhythmParameters
      default: return TokenParameters
    }
  })()

  return (

      <div>
        <div className="columns is-mobile">
          <SideBar setStimType={setStimType}/>
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
