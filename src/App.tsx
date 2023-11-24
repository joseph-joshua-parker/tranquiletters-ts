//React & Redux API
import { useEffect, useState } from 'react';
import { RootState, persistedStore } from './state/redux/store';
import { useSelector } from 'react-redux';

//CSS
import 'bulma/css/bulma.min.css';
import 'bulma-switch/dist/css/bulma-switch.min.css';
import './styles.css';
import 'bulma-accordion/dist/css/bulma-accordion.min.css'

//hooks
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


import Home from './Home';

import StimPatternModel from './components/StimPatternModel/StimPatternModel';
import PlaybackContext from './state/contexts/PlaybackContext';

//Tutorial Routing
import {Outlet, } from 'react-router';
import MediaKeyController from './shared/utilities/MediaKeyController';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
import NumParameterInput from './components/ParameterInputFields/NumParameterInput/NumParameterInput';
import { crementModelLength, modifyModelLength } from './state/redux/stimToggleSlice';

import { init } from './audio/speechSynthesis';




function App() {
  useEffect(init, []);

  //React API
  const [cursorIndex, setCursorIndex] = useState(-1);
  const {currentStimType, patternModel} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer)

  //Hooks
  const {start, cancel, pause, resume, rerender, playbackState, answerQuestion, seekCommand} = useLoop(setCursorIndex)

  const CurrentlyImplemented = [STIM_TYPES.Token, STIM_TYPES.Feedback, STIM_TYPES.None]
  const isFeatureImplemented = CurrentlyImplemented.includes(currentStimType);
  console.log(isFeatureImplemented);

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
      default: return Home
    }
  })()


  const startCancel = <span>
    { (playbackState == PLAYBACK_STATE.Waiting)
      ?<button onClick={start} className='button is-small'>
        <FontAwesomeIcon display="span" icon={faPlay}/>
      </button>
      :<button onClick={cancel} className='button is-small'>
        <FontAwesomeIcon display="span" icon={faStop}/>
      </button>
    }
  </span>

  const pauseResume = <span >
    { (playbackState != PLAYBACK_STATE.Paused)
    ? <button onClick={pause} className='button is-small'>
      <FontAwesomeIcon display="span" icon={faPause}/>
    </button>
    : <button onClick={resume} className='button is-small'>
      <FontAwesomeIcon display="span" icon={faPlay}/>
    </button>
    }
  </span>



  return (
      <PlaybackContext.Provider value={{start, cancel, pause, resume, rerender, playbackState, answerQuestion, seekCommand}}>
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

          {isFeatureImplemented &&
            <div>
              <div style={{display:'flex', justifyContent:'space-evenly'}}>

                <div style={{marginTop:'2.5vh'}}>
                  {startCancel}
                  {!(playbackState == PLAYBACK_STATE.Waiting) &&  pauseResume}
                </div>
                <NumParameterInput name='Change Pattern Length' val={patternModel.length} delta={crementModelLength} modify={modifyModelLength}/>

              </div>

                            <StimPatternModel cursorIndex={cursorIndex}/>
            </div>  
            }


          <Outlet/>

        </div>
        <div style={{display:'flex', justifyContent: 'right'}}>
        <a href="https://www.patreon.com/bePatron?u=91118617" data-patreon-widget-type="become-patron-button">Become a member!</a><script async src="https://c6.patreon.com/becomePatronButton.bundle.js"></script>        </div>

      </PlaybackContext.Provider>
      

  );
}

export default App;
