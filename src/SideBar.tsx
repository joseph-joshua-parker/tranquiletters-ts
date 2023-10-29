
import { STIM_TYPES } from "./shared/models/stimTypes";
import { switchStimToToggle } from "./state/redux/stimToggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./state/redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faReply, faSignature } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { TUTORIAL_KEYS } from "./shared/tutorialData";


const SideBar = () =>{
    const dispatch = useDispatch();
    const {currentStimType} = useSelector((state:RootState)=>state.stimToggleSliceReducer);

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
            <aside className="menu">
                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <SideBarIcon link={TUTORIAL_KEYS.Tokens} icon={faSignature} label='Tokens' stim={STIM_TYPES.Token}/>
                    <SideBarIcon link={TUTORIAL_KEYS.FeedbackGeneral} icon={faReply} label='Feedback' stim={STIM_TYPES.Feedback}/>
                </ul>

                <p className="menu-label">Coming Soon...</p>
                <ul className="menu-list">
                    <li onClick={()=>handleStimSelect(STIM_TYPES.SoundFX)}><a>SoundFX</a></li>
                    <li onClick={()=>handleStimSelect(STIM_TYPES.Ambience)}><a>Ambience</a></li>
                    <li onClick={()=>handleStimSelect(STIM_TYPES.NormalRhythm)}><a>Normal Rhythm</a></li>
                    <li onClick={()=>handleStimSelect(STIM_TYPES.PolyRhythm)}><a>Poly Rhythm</a></li>
                    <li onClick={()=>handleStimSelect(STIM_TYPES.HigherOrderPatterns)}><a>Higher Order Patterns</a></li>
                </ul>
            </aside>
        </div>
    )

}

export default SideBar;