import { useState } from "react";
import { STIM_TYPES } from "./shared/models/stimTypes";

const useSideBar = ()=>{
    const [stimType, setStimType] = useState<STIM_TYPES>(STIM_TYPES.Verbal);

    const SideBar = ()=>{
        return (
            <div className="column is-one-fifth">
                <aside className="menu">
                <p className="menu-label">Aspects</p>
                <ul className="menu-list">
                    <li onClick={()=>setStimType(STIM_TYPES.Verbal)}><a>Tokens</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.SoundFX)}><a href="">SoundFX</a></li>
                    <li onClick={()=>setStimType(STIM_TYPES.Feedback)}><a href="">Feedback</a></li>
                </ul>
                </aside>
            </div>
        )
    }
    
    return {stimType, SideBar};


}

export default useSideBar;