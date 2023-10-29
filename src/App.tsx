//React & Redux API
import { useState } from 'react';
import { RootState } from './state/redux/store';
import { useSelector } from 'react-redux';

//CSS
import 'bulma/css/bulma.min.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import './styles.css';

//hooks
import usePatternModelSelector from './state/usePatternModelSelector';
import useLoop, { PLAYBACK_STATE } from './useLoop';

//models & enums
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
  HigherOrderPatternParameters,

  WithPanel
} from './components/ParameterPanels/index';
import StimPatternModel from './components/StimPatternModel/StimPatternModel';
import PlaybackContext from './state/contexts/PlaybackContext';

import {Outlet} from 'react-router';
import TutorialLink from './components/TutorialLink';
import { TUTORIAL_KEYS } from './shared/tutorialData';




function App() {
  
  //React API
  const [cursorIndex, setCursorIndex] = useState(-1);
  const {currentStimType} = useSelector((state:RootState)=>state.stimToggleSliceReducer)

  //Hooks
  const {start, cancel, pause, resume, rerender, playbackState, answerQuestion} = useLoop(setCursorIndex)
  usePatternModelSelector(playbackState);



  //Components
  const StimParams = (()=> {
    switch(currentStimType){
      case STIM_TYPES.Token: return TokenParameters
      case STIM_TYPES.Feedback: return FeedBackParameters
      case STIM_TYPES.SoundFX: return SoundFXParameters
      case STIM_TYPES.Ambience: return AmbienceParameters
      case STIM_TYPES.NormalRhythm: return NormalRhythmParameters
      case STIM_TYPES.PolyRhythm: return PolyRhythmParameters
      case STIM_TYPES.HigherOrderPatterns: return HigherOrderPatternParameters
      default: return TokenParameters
    }
  })()

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


  return (
      <PlaybackContext.Provider value={{start, cancel, pause, resume, rerender, playbackState, answerQuestion}}>
        <div>
            <h1 className="label center-content">A Day Waker's Widgets</h1>
            <h2 className="label center-content">Anchoring, stimming, sleeping & meditation toolkit for automatic daydreamers, persons with sensory issues and overthinkers</h2>
            <br/>
          <div className="columns is-mobile">
            <div className="column is-6">
              <SideBar/>
            </div>
            <div className="column is-6">
              <WithPanel>
                <StimParams/>
              </WithPanel>
            </div>
          </div>

          
          <div>

            <StimPatternModel rerender={rerender} cursorIndex={cursorIndex}/>
            <div style={{display:'flex', justifyContent: 'center',}}>
              <TutorialLink link={TUTORIAL_KEYS.Timeline}/>
            </div>
            {startCancel}
            {!(playbackState == PLAYBACK_STATE.Waiting) &&  pauseResume}
          </div>


          <Outlet/>

        </div>
        <div style={{display:'flex', justifyContent: 'right'}}>
        <a href="https://www.patreon.com/bePatron?u=91118617" data-patreon-widget-type="become-patron-button">Become a member!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>
        </div>

      </PlaybackContext.Provider>
      

  );
}

export default App;
