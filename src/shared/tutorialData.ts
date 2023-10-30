import { TutorialProps } from "../components/Tutorial";

export const TutorialData = new Map<TUTORIAL_KEYS, TutorialProps>();
export enum TUTORIAL_KEYS {
    Tokens = 'tokens',
    SpeakTheseTokens = 'speak-these-tokens',
    TokensPerCluster = 'tokens-per-cluster',
    SilenceBetweenTokens = 'silence-between-token',
    SilenceBetweenClusters = 'silence-between-clusters',
    FeedbackGeneral = 'feedback-general',
    FeedbackByVoice = 'feedback-by-voice',
    FeedbackByMediaKeys = 'feedback-by-media-keys',
    SoundFX = 'sound-fx',
    Ambience = 'ambience',
    NormalRhythm = 'normal-rhythm',
    PolyRhythm = 'poly-rhythm',
    HigherOrderPatterns = 'higher-order-patterns',
    Adaptive = 'adaptive',
    Timeline = 'timeline',
    GenerateFeedback = 'generate-feedback',
    ReduceClusters = 'reduce-clusters'

}

TutorialData.set(
TUTORIAL_KEYS.Tokens, {
    title: 'Tokens',
    description: `A letter or word from will be spoken to you, selected randomly. Personally, I visualize the token in my mind, and
    you may find other ways of engaging with them that you find grounding.`
});

TutorialData.set(
    TUTORIAL_KEYS.SpeakTheseTokens, {
        title: 'Speak These Tokens',
        description: `You can select which tokens you want spoken to you by typing them here. They're separated by spaces, so 'hello there' is two
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
        description: `[COMING SOON] Media Keys are the Play, Pause, and other buttons on your headset or earphones. I consider it
        critical for this app, and others that I want to make. Oddly enough, this is turning out to be much, much harder to implement
        than Vocal Mode, and it really shouldn't be.`
    });

TutorialData.set(
    TUTORIAL_KEYS.Adaptive,  {
        title: 'Adaptive',
        description: `It is almost a certainty that, as your mind adjusts and becomes more focused during the session, the number of stims per round
        you find helpful will go down. In fact, four tokens in rapid succession can quickly go from soothing to annoying. So, after a set number of successes,
        Widgets will reduce the amount of stimulation for you.`
    });

TutorialData.set(
    TUTORIAL_KEYS.Timeline,  {
        title: 'Timeline',
        description: `This will display the pattern of stims that Widgets will play for you. Each space in the pattern is one second long.
        To change it, click one of the "Aspects" of the left-hand Sidebar, such as 'Tokens', 'Feedback', etc. Then, click on a space to turn it into
        a stim. When you hit start, a cursor will move across the timeline, playing the stim you've toggled.` 
    });



TutorialData.set(
    TUTORIAL_KEYS.SoundFX,  {
        title: 'SoundFX',
        description: `[COMING SOON] This feature will allow you to upload your own sound effects, either through recording, or existing files, and
        add them as stims to the Timeline. Widgets will provide a some sounds out-of-the-box to get you started.` 
    });

TutorialData.set(
    TUTORIAL_KEYS.Ambience,  {
        title: 'Ambience',
        description: `[COMING SOON] This feature will allow Widgets to dynamically generate customizable ambient soundscapes and noise from a small number of samples. Widgets
        will provide some samples and soundscapes out-of-the-box to get you started` 
    });

TutorialData.set(
    TUTORIAL_KEYS.NormalRhythm,  {
        title: 'Ambience',
        description: `[COMING SOON] This feature will allow Widgets to generate rhythmic patterns that can be synchronized to the Tokens` 
    });

TutorialData.set(
    TUTORIAL_KEYS.PolyRhythm,  {
        title: 'Ambience',
        description: `[COMING SOON] This feature will allow Widgets to generate Euclidean Poly Rhythms that can be synchronized with the Tokens` 
    });

TutorialData.set(
    TUTORIAL_KEYS.HigherOrderPatterns,  {
        title: 'Higher Order Patterns',
        description: `[COMING SOON] This feature will allow Widgets to generate dynamically changing patterns of Tokens & Sound Effects, such as ensuring 
        that a cluster of, say, 3 tokens takes the form [a OR b] AND [e OR f] AND [y OR z]
        ` 
    });

TutorialData.set(
    TUTORIAL_KEYS.GenerateFeedback,  {
        title: 'Generate Feedback to fill increasing silence',
        description: `With Adaptive Mode, there will be increasingly long stretches of silence. This setting will tell Widgets to break
        those long stretches up with Feedback. This setting is only really useful when you want to keep Tokens in your loop.
        ` 
    });

TutorialData.set(
    TUTORIAL_KEYS.ReduceClusters,  {
        title: 'Reduce Cluster Frequency',
        description: `Adaptive Mode can instead reduce how often token clusters are spoken, rather than the number of tokens per cluster
        ` 
    });








    
    