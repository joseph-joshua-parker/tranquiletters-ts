
import { STIM_TYPES } from "./shared/models/stimTypes";
import { switchStimToToggle } from "./state/redux/stimToggleSlice";
import { useDispatch } from "react-redux";

const SideBar = () =>{
    const dispatch = useDispatch();

    const handleStimSelect = (type: STIM_TYPES) => dispatch(switchStimToToggle(type));

    return (
        <div className="column is-one-fifth">
            <aside className="menu">
                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <li onClick={()=>handleStimSelect(STIM_TYPES.Token)}><a>Tokens</a></li>
                    <li onClick={()=>handleStimSelect(STIM_TYPES.Feedback)}><a>Feedback</a></li>
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