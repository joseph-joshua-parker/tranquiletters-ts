import { TutorialProps } from "../components/Tutorial";

export const TutorialData = new Map<TUTORIAL_KEYS, TutorialProps>();
export enum TUTORIAL_KEYS {
    Tokens = 'tokens',
    TokensPerCluster = 'tokens-per-cluster',
    SilenceBetweenTokens = 'silence-between-token',
    SilenceBetweenClusters = 'silence-between-clusters',
    FeedbackGeneral = 'feedback-general',
    FeedbackByVoice = 'feedback-by-voice',
    FeedbackByMediaKeys = 'feedback-by-media-keys',
    Adaptive = 'adaptive'

}


TutorialData.set(
    TUTORIAL_KEYS.Tokens, {
        title: 'Tokens',
        description: `A letter or word from this list will be spoken to you, selected randomly. Separated by spaces, so 'hello there' is two
        separate tokens`
    });


TutorialData.set(
    TUTORIAL_KEYS.TokensPerCluster,  {
        title: 'Tokens Per Cluster',
        description: 'A cluster is just a group of tokens being spaced apart evenly. '
    });

TutorialData.set(
    TUTORIAL_KEYS.SilenceBetweenTokens,  {
        title: 'Silence Between Tokens ',
        description: 'The number of seconds that tokens within a cluster are spaced apart by'
    });

TutorialData.set(
    TUTORIAL_KEYS.SilenceBetweenClusters,  {
        title: 'Silence Between Clusters ',
        description: `The number of seconds that the clusters themselves are spaced apart by. Currently, this setting
        also controls the length of the timeline itself. This will be fixed in later versions.`
    });

TutorialData.set(
    TUTORIAL_KEYS.FeedbackGeneral,  {
        title: 'Feedback General',
        description: `Widgets can also check in with you to see if you're still aware and focused. Each time you don't acknowledge within the timeframe,
        it will beep. After a set number of strikes, a voice will notify you and Widgets will cancel the session so you can change the stims you're using.`
    });

TutorialData.set(
    TUTORIAL_KEYS.FeedbackByVoice,  {
        title: 'Feedback By Voice',
        description: `If you're working with your hands, or just don't want to hold your phone constantly, you can instead speak your
        acknowledgement. You can also tell Widgets which phrases to listen for. Unlike the token list, the phrases are separated by commas,
        not spaces.`
    });

TutorialData.set(
    TUTORIAL_KEYS.FeedbackByMediaKeys,  {
        title: 'Feedback By Media Keys',
        description: `[COMING SOON] Media Keys are the Play, Pause, and other buttons on your headset or earphones. Believe me, this functionality is the
        bane of my existence as a developer, I don't understand why I'm having this much trouble with it, and I consider it
        critical for this app, and others that I want to make. Seven yikes.`
    });

TutorialData.set(
    TUTORIAL_KEYS.Adaptive,  {
        title: 'Adaptive',
        description: `It is almost a certainty that, as your mind adjusts and becomes more focused during the session, the number of stims per round
        you find helpful will go down. In fact, four tokens in rapid succession can quickly go from soothing to annoying. So, after a set number of successes,
        Widgets will reduce the amount of stimulation for you.`
    });







    
    