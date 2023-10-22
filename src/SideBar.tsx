import { SetStateAction, useState } from "react";
import { STIM_TYPES } from "./shared/models/stimTypes";

interface SideBarProps {
    setStimType: React.Dispatch<SetStateAction<STIM_TYPES>>
}

const SideBar: React.FC<SideBarProps> = ({setStimType})=>{

    return (
        <div className="column is-one-fifth">
            <aside className="menu">
                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <li onClick={()=>setStimType(STIM_TYPES.Token)}><a>Tokens</a></li>
                </ul>

                <p className="menu-label">Coming Soon...</p>
                <ul className="menu-list">
                    <li onClick={()=>setStimType(STIM_TYPES.SoundFX)}><a>SoundFX</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.Feedback)}><a>Feedback</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.Ambience)}><a>Ambience</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.NormalRhythm)}><a>Normal Rhythm</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.PolyRhythm)}><a>Poly Rhythm</a></li>
                </ul>
            </aside>
        </div>
    )

}

export default SideBar;