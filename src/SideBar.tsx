
import { STIM_TYPES } from "./shared/models/stimTypes";
import { switchStimToToggle } from "./state/redux/stimToggleSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faReply, faSignature } from "@fortawesome/free-solid-svg-icons";

const SideBar = () =>{
    const dispatch = useDispatch();

    const handleStimSelect = (type: STIM_TYPES) => dispatch(switchStimToToggle(type));

    interface SideBarIconProps {
        stim: STIM_TYPES,
        icon: IconDefinition,
        label: string
    }
    const SideBarIcon: React.FC<SideBarIconProps> = ({stim, icon, label}) =>{
        return <li style={{boxSizing: 'border-box'}} onClick={()=>handleStimSelect(stim)}>
            <FontAwesomeIcon color={'#303030'} icon={icon}/>{label}
        </li>
    }

    return (
        <div className="column is-one-fifth">
            <aside className="menu">
                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <SideBarIcon icon={faSignature} label='Tokens' stim={STIM_TYPES.Token}/>
                    <SideBarIcon icon={faReply} label='Feedback' stim={STIM_TYPES.Feedback}/>
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