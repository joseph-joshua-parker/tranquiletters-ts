import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import { persistedStore, store } from './state/redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { PURGE } from 'redux-persist';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { TUTORIAL_KEYS, TutorialData } from './shared/tutorialData';
import Tutorial from './components/Tutorial';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: TUTORIAL_KEYS.Tokens,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.Tokens)}/>
      },

      {
        path: TUTORIAL_KEYS.SpeakTheseTokens,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.SpeakTheseTokens)}/>
      },
    
      {
        path: TUTORIAL_KEYS.TokensPerCluster,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.TokensPerCluster)}/>
      },
    
      {
        path: TUTORIAL_KEYS.SilenceBetweenClusters,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.SilenceBetweenClusters)}/>
      },
    
      {
        path: TUTORIAL_KEYS.SilenceBetweenTokens,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.SilenceBetweenTokens)}/>
      },
    
      {
        path: TUTORIAL_KEYS.FeedbackGeneral,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.FeedbackGeneral)}/>
      },
    
      {
        path: TUTORIAL_KEYS.FeedbackByVoice,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.FeedbackByVoice)}/>
      },

      {
        path: TUTORIAL_KEYS.FeedbackByMediaKeys,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.FeedbackByMediaKeys)}/>
      },

      {
        path: TUTORIAL_KEYS.Adaptive,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.Adaptive)}/>
      },

      {
        path: TUTORIAL_KEYS.Timeline,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.Timeline)}/>
      },

      {
        path: TUTORIAL_KEYS.SoundFX,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.SoundFX)}/>
      },

      {
        path: TUTORIAL_KEYS.Ambience,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.Ambience)}/>
      },

      {
        path: TUTORIAL_KEYS.NormalRhythm,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.NormalRhythm)}/>
      },

      {
        path: TUTORIAL_KEYS.PolyRhythm,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.PolyRhythm)}/>
      },

      {
        path: TUTORIAL_KEYS.HigherOrderPatterns,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.HigherOrderPatterns)}/>
      },

      {
        path: TUTORIAL_KEYS.ReduceClusters,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.ReduceClusters)}/>
      },

      {
        path: TUTORIAL_KEYS.GenerateFeedback,
        element: <Tutorial {...TutorialData.get(TUTORIAL_KEYS.GenerateFeedback)}/>
      },
    ]
  },




]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const createApp = () => root.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistedStore}>
        <RouterProvider router={router}/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

try{createApp();}
catch(e: any){ 
  persistedStore.purge()
  createApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();


