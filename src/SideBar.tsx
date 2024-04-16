
import { STIM_TYPES } from "./shared/models/stimTypes";
import { switchStimToToggle } from "./state/redux/stimToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faHome, faReply, faSignature, faSquare, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TUTORIAL_KEYS } from "./shared/tutorialData";
import { PLAYBACK_STATE } from "./useLoop";

interface SidebarProps {
    state: PLAYBACK_STATE
}

const SideBar:React.FC<SidebarProps> = ({state}) =>{
    const dispatch = useDispatch();
    const {currentStimType} = useSelector((state:RootState)=>state.persistedRootReducer.stimToggleSliceReducer);

    const handleStimSelect = (type: STIM_TYPES) => dispatch(switchStimToToggle(type));
    const isSelectedStyle = (stim:STIM_TYPES)=> stim == currentStimType ? 'dimgray' : 'black'

    interface SideBarIconProps {
        stim: STIM_TYPES,
        icon: IconDefinition,
        label: string,
        link: TUTORIAL_KEYS
    }
    const SideBarIcon: React.FC<SideBarIconProps> = ({stim, icon, label, link}) =>{
        return <li style={{backgroundColor: isSelectedStyle(stim), boxSizing: 'border-box'}} onClick={()=>handleStimSelect(stim)}>
            <Link to={link}>
                <FontAwesomeIcon color={'#303030'} icon={icon}/>{label}
            </Link>
        </li>
    }

    return (
        <div className="column is-one-fifth">
            
            
            {state == PLAYBACK_STATE.Playing || <aside className="menu">
                <ul className="menu-list">
                    <SideBarIcon link={TUTORIAL_KEYS.Home} icon={faHome} label='Home' stim={STIM_TYPES.None}/>

                </ul>


                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <SideBarIcon link={TUTORIAL_KEYS.Tokens} icon={faSignature} label='Tokens' stim={STIM_TYPES.Token}/>
                    <SideBarIcon link={TUTORIAL_KEYS.FeedbackGeneral} icon={faReply} label='Feedback' stim={STIM_TYPES.Feedback}/>
                    <SideBarIcon link={TUTORIAL_KEYS.SoundFX} icon={faVolumeHigh} label='Sound FX' stim={STIM_TYPES.SoundFX}/>

                </ul>

                <p className="menu-label">Coming Soon...</p>
                <ul className="menu-list">
                    <SideBarIcon link={TUTORIAL_KEYS.Ambience} icon={faSquare} label='Ambience' stim={STIM_TYPES.Ambience}/>
                    <SideBarIcon link={TUTORIAL_KEYS.NormalRhythm} icon={faSquare} label='Normal Rhythm' stim={STIM_TYPES.NormalRhythm}/>
                    <SideBarIcon link={TUTORIAL_KEYS.PolyRhythm} icon={faSquare} label='Poly Rhythm' stim={STIM_TYPES.PolyRhythm}/>
                    <SideBarIcon link={TUTORIAL_KEYS.HigherOrderPatterns} icon={faSquare} label='Higher Order Patterns' stim={STIM_TYPES.HigherOrderPatterns}/>
                </ul>
            </aside>}
        </div>
    )

}

export default SideBar;